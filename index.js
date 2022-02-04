const express = require('express');
const dotenv = require('dotenv').config();
const setupDB = require('./src/utils/setupDB');
const urlRoutes = require('./src/routes/urlRoute');

//express app
const app = express();

//setup database
setupDB();

//setup express
app.use(express.json());
app.use('/api/url', urlRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});