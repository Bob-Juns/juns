const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const generateCookie = require('../utils/generateCookie.util');
const A_DAY = 1000 * 60 * 60 * 24;

const login = (res, token) => {
	generateCookie(res, token, A_DAY);
	return res.status(200).json({ message: '로그인 되었습니다.' });
};

const register = async (
	res,
	userName,
	userId,
	userEmail,
	userPassword,
	registerWith
) => {
	const hashedPassword = await bcrypt.hash(userPassword, 10);
	await new User({
		userName,
		userId,
		userEmail,
		userPassword: hashedPassword,
		registerWith,
	}).save();
};

module.exports = { register, login };
