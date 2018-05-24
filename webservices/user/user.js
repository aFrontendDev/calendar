
var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  password: String,
  email: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');