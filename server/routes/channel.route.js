require('dotenv').config();

const router = require('express').Router();
const Channel = require('../models/channel.model');

const { admin } = require('../middlewares/auth.middleware');

router.get('/channels', async (req, res) => {
	const channels = await Channel.find().orFail(() =>
		res.status(400).json({ message: '채널을 불러올 수 없습니다.' })
	);

	return res.status(200).json(channels);
});

router.get('/:channelId', async (req, res) => {
	const channel = await Channel.findOne({
		channelId: req.params.channelId,
	}).orFail(() =>
		res.status(404).json({ message: '채널을 찾을 수 없습니다.' })
	);

	return res.status(200).json(channel);
});

router.post('/create', admin, async (req, res) => {
	try {
		await new Channel({
			category: req.body.category,
			channelId: req.body.channelId,
			channelTitle: req.body.channelTitle,
			channelCover: req.body.channelCover,
			channelProducer: req.body.channelProducer,
			channelCast: req.body.channelCast,
			channelPlaylist: req.body.channelPlaylist,
		}).save();
		return res.status(201).json({ message: '채널이 생성되었습니다.' });
	} catch {
		return res.status(400).json({ message: '채널 생성이 실패했습니다.' });
	}
});

router.put('/update/:channelId', admin, async (req, res) => {
	try {
		await Channel.findOneAndUpdate(
			{ channelId: req.params.channelId },
			{
				category: req.body.category,
				channelId: req.body.channelId,
				channelTitle: req.body.channelTitle,
				channelCover: req.body.channelCover,
				channelProducer: req.body.channelProducer,
				channelCast: req.body.channelCast,
				channelPlaylist: req.body.channelPlaylist,
			},
			{ new: true }
		);
		return res.status(200).json({ message: '채널이 수정 되었습니다.' });
	} catch {
		return res.status(400).json({ message: '채널 수정이 실패했습니다.' });
	}
});

router.delete('/delete/:channelId', admin, async (req, res) => {
	try {
		await Channel.findOneAndDelete({ channelId: req.params.channelId });
		return res.status(200).json({ message: '채널이 삭제되었습니다.' });
	} catch {
		return res.status(400).json({ messsage: '채널 삭제가 실패했습니다.' });
	}
});

module.exports = router;
