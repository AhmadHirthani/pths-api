'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweets = mongoose.Schema({
    tweetId: {type: String},
    text: {type: String},
    location: {type: String},
    label: {type: String, enum: ['Not labeled', 'negative','positive'], },
    labelingUser: {type: Number },
    repeated: {type: Boolean, default: false },
    hash: { type:Number } }
    ,
  { collection: "labeled-tweets" }  
);

module.exports = mongoose.model('tweets', tweets);
