require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoDbSession = require('connect-mongodb-session')(session);
const path = require('path');

const port = 8080;
const app = express();

// Middleware

const store = new MongoDbSession({
    uri: process.env.MONGODB_URI,
    collection: 'sessions',
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 week
    })
);

// View engine

app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Routes

app.use('/', require('./routes/static.router'));
app.use('/api', require('./routes/api.router'));

// Connect to DB

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Start server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});