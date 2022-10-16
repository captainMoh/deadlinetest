const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config({path: './config/.env'});
require('./config/db');

const userRoute = require('./routes/userRoute');

app.use(express.static('client/build'));
app.use(express.json());

app.use('/users', userRoute);

app.get('/*', (_,res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
})
