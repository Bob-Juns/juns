require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {
	const token = req.cookies.authToken;
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
			const user = await User.findOne({ userId: decoded.userId });
			req.user = user;
			return next();
		} catch {
			return res.json({ message: '유효하지 않은 토큰입니다.', isAuth: false });
		}
	} else {
		return res.json({ message: '토큰이 존재하지 않습니다.', isAuth: false });
	}
};

const admin = (req, res, next) => {
	auth(req, res, () => {
		if (req.user.isAdmin) return next();
		return res.json({ message: '관리자만 접근할 수 있습니다.' });
	});
};

module.exports = {
	auth,
	admin,
};
