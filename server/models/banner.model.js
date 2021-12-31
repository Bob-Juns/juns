const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
	bannerId: { type: String, required: true, unique: true },
	bannerTitle: { type: String, required: true },
	bannerImage: {
		fileName: { type: String, required: true },
		filePath: { type: String, required: true },
	},
	bannerLink: { type: String, required: true },
});

module.exports = mongoose.model('banner', bannerSchema);
