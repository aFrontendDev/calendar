
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  events: Array,
  eventsAdmin: Array
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');