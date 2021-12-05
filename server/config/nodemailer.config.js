require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
	service: 'kakao',
	port: 465,
	host: 'smtp.kakao.com',
	auth: {
		user: process.env.NODEMAILER_USER,
		pass: process.env.NODEMAILER_PASSWORD,
	},
});
