require('dotenv').config;

const generateCookie = (res, token, maxAge) => {
	res.cookie('authToken', token, {
		httpOnly: true,
		secure: true,
		maxAge,
	});
};

module.exports = generateCookie;
