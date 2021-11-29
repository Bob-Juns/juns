require('dotenv').config();

const router = require('express').Router();
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken.util');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	try {
		await new User({
			userName: req.body.userName,
			userId: req.body.userId,
			userEmail: req.body.userEmail,
			password: hashedPassword,
		}).save();

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
		req.body.password,
		user.password
	);

	const token = generateToken(user.userId);

	try {
		if (comparePassword) {
			req.cookies('authToken', token, {
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
			});

			return res.status(200).json({ message: '로그인 되었습니다.' });
		} else {
			return res.status(400).json({ message: '잘못된 비밀번호입니다.' });
		}
	} catch {
		return res.json({ message: '로그인이 실패했습니다.' });
	}
});

router.post('/logout', (req, res) => {
	res.cookies('authToken', '', {
		httpOnly: true,
		maxAge: 0,
	});
});

module.exports = router;
