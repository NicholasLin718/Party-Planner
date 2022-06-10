const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const Page = require('./models/model');
const routes = require('./routes/routes');
connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);
app.listen(port, () => console.log(`Server started on port ${port}`));
