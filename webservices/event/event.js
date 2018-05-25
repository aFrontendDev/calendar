var mongoose = require('mongoose');
var EventSchema = new mongoose.Schema({
  adminName: String,
  adminId: String,
  password: String,
  users: Array,
  targetDate: String,
  targetTime: String,
  location: Object
});
mongoose.model('Event', EventSchema);

module.exports = mongoose.model('Event');