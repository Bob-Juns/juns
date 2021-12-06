const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

const transporter = nodemailer.createTransport({
	service: 'kakao',
	port: 465,
	host: 'smtp.kakao.com',
	auth: {
		user: process.env.NODEMAILER_USER,
		pass: process.env.NODEMAILER_PASSWORD,
	},
});

const htmlToSend = (filePath, code) => {
	const source = fs.readFileSync(filePath, 'utf-8').toString();
	const template = handlebars.compile(source);
	const replacement = { code };

	return template(replacement);
};

module.exports = { transporter, htmlToSend };
