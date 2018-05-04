const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = Schema({
  user: String,
  password: String
});

module.exports = mongoose.model('User', schema);
