
// 'use strict';
// const express = require('express');
// const router = express.Router();
// const tweets = require('./lib/tweets/tweets-collection');


// const { post } = require('superagent');

// //routes
// router.patch('/tweets/:id', editOneUnlabeledTweet);
// router.get('/tweet/:userId', getOneUnlabeledTweet);
// router.get('/tweets/:userId', getAllTweetsForOneUser);

// router.get('/', getAllTweets);
// // router.get('/process', addUsersNumbers);



// function getOneUnlabeledTweet(req, res) {
//     console.log('getOneUnlabeledTweet called');
//     let userId = req.params.userId;
//     tweets.get({ labelingUser: userId, label: 'Not labeled' }).then(allTweets => {

//         // tweets.getOne({ label: 'Not labeled', labelingUser: userId }).then(result => {
//         //     console.log('result>>> ', result);
//         //     res.json({ count: allTweets.length, result: result })

//         // })
//         res.json({ UnlabeledTweets: allTweets.length, Tweet: allTweets[0] })

//     })



// }


// function getAllTweetsForOneUser(req, res) {
//     console.log('getAllTweetsForOneUser called');
//     let userId = req.params.userId;
//     console.log({ userId });
//     tweets.get({ labelingUser: userId }).then(result => {
//         console.log('result>>> ', result);
//         res.json({ count: result.length, result: result })
//     })
// }

// function getAllTweets(req, res) {
//     console.log('getAllTweets called');
//     tweets.get().then(result => {
//         console.log('result>>> ', result);
//         res.json({ count: result.length, result: result })
//     })
// }

// function editOneUnlabeledTweet(req, res) {
//     console.log('editOneUnlabeledTweet called');

//     let id = req.params.id;
//     let newLabel = req.body.label;
//     console.log({ id });
//     console.log({ newLabel });

//     // req.model.update(postId, { comments: commntsArray }).then(result => {

//     tweets.update(id, { label: newLabel }).then(result => {
//         console.log('updating result>>> ', result);
//         res.json(result)
//     })
// }

// function addUsersNumbers(req, res) {
//     console.log('getAllTweets called');
//     tweets.get().then(results => {
//         results.forEach((element, idx) => {
//             console.log({ idx });
//             let userId;
//             if (idx >= 0 && idx < 3200) {
//                 userId = 1;
//             } else if (idx >= 3200 && idx < 6400) {
//                 userId = 2;
//             } else if (idx >= 6400 && idx < 9600) {
//                 userId = 3;
//             } else if (idx >= 9600 && idx < 12800) {
//                 userId = 4;
//             } else {
//                 userId = 5;
//             }
//             // console.log('element._id>>>', element._id);
//             tweets.update(element._id, { labelingUser: userId }).then(result => {
//                 console.log('updating labelingUser result>>> ', result);
//                 // res.json(result)
//             })

//         });

//         // console.log('result>>> ', result);
//         // res.json(result)
//     })
// }

// module.exports = router;
