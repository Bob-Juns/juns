require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

// connect database
require('./config/mongoose.config');

// cors
const cors = require('cors');
const corsOption = {
	origin: true,
	Credential: true,
};
app.use(cors(corsOption));

// cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// body-parser
app.use(express.json());

const userRouter = require('./routes/user.route');
const channelRouter = require('./routes/channel.route');
const fileRouter = require('./routes/file.route');
const bannerRouter = require('./routes/banner.route');

app.use('/api/user', userRouter);
app.use('/api/channel', channelRouter);
app.use('/api/file', fileRouter);
app.use('/api/banner', bannerRouter);

// serve static files & http to https
const enforce = require('express-sslify');
if (process.env.NODE_ENV === 'production') {
	app.use(enforce.HTTPS({ trustProtoHeader: true }));
	app.use(express.static(path.join(__dirname, '../client', 'dist')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
	});
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
