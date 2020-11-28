
'use strict';
const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
require('dotenv').config();
var bodyParser = require('body-parser')

const tweets = require('./auth/lib/tweets/tweets-collection.js');




const app = express();
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
// app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'));


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


// app.use(cors());
// app.use(morgan('dev'));
// app.get('/bad', (req, res) => {
//     throw new Error('bad Request .... ');
// });
// app.use('*', error404);
// app.use(error500);






//routes
app.patch('/tweets/:id', editOneUnlabeledTweet);
app.get('/tweet/:userId', getOneUnlabeledTweet);
app.get('/labeled-tweets/:userId', getLabeledTweetForOneUser);

app.get('/tweets/:userId', getAllTweetsForOneUser);

app.get('/', getAllTweets);
// router.get('/process', addUsersNumbers);


function getLabeledTweetForOneUser(req, res) {
    console.log('getLabeledTweetForOneUser called');
    let userId = req.params.userId;
    tweets.get({ labelingUser: userId, 'label': { $in: ['positive','negative' ]}}).then(allTweets => {
        res.json({ labeledTweetsCount: allTweets.length, labeledTweets: allTweets })
    })
}


function getOneUnlabeledTweet(req, res) {
    console.log('getOneUnlabeledTweet called');
    let userId = req.params.userId;
    tweets.get({ labelingUser: userId, label: 'Not labeled' }).then(allTweets => {
        // tweets.getOne({ label: 'Not labeled', labelingUser: userId }).then(result => {
        //     console.log('result>>> ', result);
        //     res.json({ count: allTweets.length, result: result })
        // })
        res.json({ UnlabeledTweets: allTweets.length, Tweet: allTweets[0] })
    })
}


function getAllTweetsForOneUser(req, res) {
    console.log('getAllTweetsForOneUser called');
    let userId = req.params.userId;
    console.log({ userId });
    tweets.get({ labelingUser: userId }).then(result => {
        console.log('result>>> ', result);
        res.json({ count: result.length, result: result })
    })
}

function getAllTweets(req, res) {
    console.log('getAllTweets called');
    tweets.get().then(result => {
        console.log('result>>> ', result);
        res.json({ count: result.length, result: result })
    })
}

function editOneUnlabeledTweet(req, res) {
    console.log('editOneUnlabeledTweet called');

    let id = req.params.id;
    let newLabel = req.body.label;
    console.log({ id });
    console.log({ newLabel });
    // req.model.update(postId, { comments: commntsArray }).then(result => {
    tweets.update(id, { label: newLabel }).then(result => {
        console.log('updating result>>> ', result);
        res.json(result)
    })
}

function addUsersNumbers(req, res) {
    console.log('getAllTweets called');
    tweets.get().then(results => {
        results.forEach((element, idx) => {
            console.log({ idx });
            let userId;
            if (idx >= 0 && idx < 3200) {
                userId = 1;
            } else if (idx >= 3200 && idx < 6400) {
                userId = 2;
            } else if (idx >= 6400 && idx < 9600) {
                userId = 3;
            } else if (idx >= 9600 && idx < 12800) {
                userId = 4;
            } else {
                userId = 5;
            }
            // console.log('element._id>>>', element._id);
            tweets.update(element._id, { labelingUser: userId }).then(result => {
                console.log('updating labelingUser result>>> ', result);
                // res.json(result)
            })

        });

        // console.log('result>>> ', result);
        // res.json(result)
    })
}

module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT;
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    },
};
