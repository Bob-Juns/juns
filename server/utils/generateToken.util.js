require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (userEmail) => {
	return jwt.sign({ userEmail }, process.env.JWT_SECRET_KEY);
};

module.exports = generateToken;
