require('dotenv').config();

const mongoose = require('mongoose');

module.exports = mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB connected!'))
	.catch((error) => {
		console.log(`Cannot connect Database: ${error}`);
		process.exit(1);
	});
