const express = require("express");
const path = require('path');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser') 
const mongoose = require('mongoose')
const corsOptions = require ('./config/corsOptions')
const credentials = require('./middleware/credentials')
const connectDB = require('./config/dbConn'); 
const verifyJWT = require('./middleware/verifyJWT')

connectDB();

app.use(credentials);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {res.send("hello everybody! this is GameOrGame server!")});
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/findTheWord', require('./routes/findTheWord'));
app.use(verifyJWT);
app.use('/users', require('./routes/users'));
app.all('*', (req, res) => {
    res.status(404);
    res.send("404...page is not exsist");
});

const PORT = process.env.PORT || 3500

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});