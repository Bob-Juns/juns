const router = require('express').Router();
const Banner = require('../models/banner.model');

const { admin } = require('../middlewares/auth.middleware');

router.get('/banners', async (req, res) => {
	const banners = await Banner.find().orFail(() =>
		res.status(404).json({ message: '배너를 불러올 수 없습니다.' })
	);

	return res.status(200).json(banners);
});

router.get('/:bannerId', async (req, res) => {
	const banner = await Banner.findOne({ bannerId: req.params.bannerId }).orFail(
		() => res.status(404).json({ message: '배너를 찾을 수 없습니다.' })
	);

	return res.status(200).json(banner);
});

router.post('/create', admin, async (req, res) => {
	try {
		await new Banner({
			bannerId: req.body.bannerId,
			bannerTitle: req.body.bannerTitle,
			bannerImage: {
				fileName: req.body.bannerImage.fileName,
				filePath: req.body.bannerImage.filePath,
			},
			bannerLink: req.body.bannerLink,
		}).save();
		return res.status(201).json({ message: '배너가 생성되었습니다.' });
	} catch {
		return res.status(400).json({ message: '배너 생성이 실패했습니다.' });
	}
});

router.put('/update/:bannerId', admin, async (req, res) => {
	try {
		await Banner.findOneAndUpdate(
			{ bannerId: req.params.bannerId },
			{
				bannerId: req.body.bannerId,
				bannerTitle: req.body.bannerTitle,
				bannerImage: req.body.bannerImage,
				bannerLink: req.body.bannerLink,
			},
			{ new: true }
		);
		return res.status(200).json({ message: '배너가 업데이트 되었습니다.' });
	} catch {
		return res.status(400).json({ message: '배너 업데이트가 실패했습니다.' });
	}
});

router.delete('/delete/:bannerId', admin, async (req, res) => {
	try {
		await Banner.findOneAndDelete({ bannerId: req.params.bannerId }).orFail(
			() => res.status(404).json({ message: '배너를 팢을 수 없습니다.' })
		);
		return res.status(200).json({ message: '배너가 삭제되었습니다.' });
	} catch {
		return res.status(400).json({ message: '배너 삭제가 실패했습니다.' });
	}
});

module.exports = router;
