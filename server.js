
'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');
const sendMail = require('./8-send-email/send-email.js');

require('dotenv').config();
var bodyParser = require('body-parser')


const routes = require('./auth/router');
const error404 = require('./middleware/404.js');
const error500 = require('./middleware/500.js');
const app = express();
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
// app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'));
// routes to handle payments
// app.post('/editTweet', editOneUnlabeledTweet);
// app.get('/tweets', getOneUnlabeledTweet);


app.all("*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    );
  
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );
    console.log(req.method, req.url);
    next();
  });


app.use(cors());
app.use(morgan('dev'));
app.use(routes);
app.get('/bad', (req, res) => {
    throw new Error('bad Request .... ');
});
app.use('*', error404);
app.use(error500);
module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT;
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    },
};
