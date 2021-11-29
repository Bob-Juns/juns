require('dotenv').config();

const router = require('express').Router();
const User = require('../models/user.model');
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

module.exports = router;
