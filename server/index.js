require('dotenv').config();

const express = require('express');
const app = express();

// connect database
require('./config/mongoose.config');

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
