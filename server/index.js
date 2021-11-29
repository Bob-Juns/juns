require('dotenv').config();

const express = require('express');
const app = express();

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
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
