require('dotenv').config();

const router = require('express').Router();
const User = require('../models/user.model');

const generateCookie = require('../utils/generateCookie.util');
const generateToken = require('../utils/generateToken.util');
const generateCode = require('../utils/generateCode.util');
const { register, login } = require('../utils/userAction.util');
const bcrypt = require('bcrypt');

const { transporter, htmlToSend } = require('../config/nodemailer.config');
const path = require('path');

const { auth, admin } = require('../middlewares/auth.middleware');

router.get('/auth', auth, (req, res) => {
	return res.status(200).json({
		userName: req.user.userName,
		userId: req.user.userId,
		userEmail: req.user.userEmail,
		isAdmin: req.user.userEmail,
		isAuth: true,
	});
});

router.get('/users', admin, async (req, res) => {
	const users = await User.find().orFail(() =>
		res.status(400).json({ message: '유저를 불러올 수 없습니다.' })
	);

	const usersWithoutPassword = users.map((user) => ({
		userName: user.userName,
		userId: user.userId,
		userEmail: user.userEmail,
		isAdmin: user.isAdmin,
	}));
	return res.status(200).json(usersWithoutPassword);
});

router.post('/confirmation', async (req, res) => {
	const user = await User.findOne({ userEmail: req.body.userEmail });

	if (req.body.location === 'register' && user) {
		return res.status(409).json({
			message: `이미 ${user.registerWith}(으)로 가입된 이메일입니다.`,
		});
	} else {
		const code = generateCode(6);
		const filePath = path.join(
			__dirname,
			'../template',
			'register.template.html'
		);

		await transporter.sendMail(
			{
				from: `no-reply <${process.env.NODEMAILER_USER}>`,
				to: req.body.userEmail,
				subject: '[JUNSTREAMING] 이메일을 인증해주세요.',
				html: htmlToSend(filePath, code),
			},
			(err, info) => {
				if (err) {
					return res
						.status(400)
						.json({ message: '이메일 발송이 실패했습니다.' });
				} else {
					return res.status(200).json({
						message: '이메일을 발송했습니다.',
						code,
					});
				}
			}
		);
	}
});

router.post('/register', async (req, res) => {
	try {
		await register(
			res,
			req.body.userName,
			req.body.userId,
			req.body.userEmail,
			req.body.userPassword,
			'email'
		);
		return res.status(201).json({ message: '회원가입 되었습니다.' });
	} catch {
		return res.json({ message: '회원가입이 실패했습니다.' });
	}
});

router.post('/login', async (req, res) => {
	const user = await User.findOne({ userEmail: req.body.userEmail }).orFail(
		() => res.status(404).json({ message: '가입되지 않은 이메일입니다.' })
	);

	const comparePassword = await bcrypt.compare(
		req.body.userPassword,
		user.userPassword
	);

	const token = generateToken(user.userId);

	try {
		if (comparePassword) {
			login(res, token);
		} else {
			return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
		}
	} catch {
		return res.status(400).json({ message: '로그인이 실패했습니다.' });
	}
});

router.post('/logout', (req, res) => {
	generateCookie(res, '', 0);
	return res.status(200).json({ message: '로그아웃 되었습니다.' });
});

router.post('/kakao', async (req, res) => {
	const userById = await User.findOne({ userId: req.body.userId });
	const userByEmail = await User.findOne({ userEmail: req.body.userEmail });

	const token = generateToken(req.body.userId);
	try {
		if (userByEmail && userByEmail.registerWith !== 'kakao') {
			return res.status(409).json({
				message: `이미 ${userByEmail.registerWith} (으)로 가입되었습니다.`,
			});
		} else if (userById) {
			login(res, token);
		} else {
			await register(
				res,
				req.body.userName,
				req.body.userId,
				req.body.userEmail,
				process.env.SOCIAL_SECRET,
				'kakao'
			);
		}
	} catch {
		return res.status(400).json({ message: '로그인이 실패했습니다.' });
	}
});

module.exports = router;
