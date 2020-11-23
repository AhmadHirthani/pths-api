'use strict';

const schema = require('./tweetsSchema');
const Model = require('../mongoModel.js');

class Tweet extends Model {
  constructor() {
    super(schema);
  }
   
}

module.exports = new Tweet();