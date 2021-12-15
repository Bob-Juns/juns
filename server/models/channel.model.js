const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
	category: { type: String, required: true },
	channelId: { type: String, required: true, unique: true },
	channelTitle: { type: String, required: true },
	channelCover: {
		fileName: { type: String, required: true },
		filePath: { type: String, required: true },
	},
	channelProducer: { type: String, required: true },
	channelCast: { type: [String], required: true },
	channelPlaylist: {
		type: [{ playlistTitle: String, playlistId: String }],
		required: true,
	},
});

module.exports = mongoose.model('channel', channelSchema);
