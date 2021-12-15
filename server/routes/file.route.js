require('dotenv').config();
require('../config/cloudinary.config');

const router = require('express').Router();
const Channel = require('../models/channel.model');
const { admin } = require('../middlewares/auth.middleware');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const coverStorage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: (req, file) => {
		const filename = `[cover]${file.originalname.split('.')[0]}`;
		const fileInfo = {
			public_id: filename,
			folder: 'junstreaming/cover',
		};
		return fileInfo;
	},
});

const coverUpload = multer({ storage: coverStorage }).single('image');

router.post('/cover-upload', admin, coverUpload, (req, res) => {
	return res
		.status(200)
		.json({ fileName: req.file.filename, filePath: req.file.path });
});

router.post('/cover-delete', admin, (req, res) => {
	cloudinary.uploader.destroy(req.body.fileName, (error, result) => {
		if (error)
			return res.status(400).json({ message: '이미지 삭제가 실패했습니다.' });
		return res.status(200).json({ message: '이미지가 삭제되었습니다.' });
	});
});

module.exports = router;
