require('dotenv').config();

const express = require('express');
const app = express();

// connect database
require('./config/mongoose.config');

// cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// body-parser
app.use(express.json());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
