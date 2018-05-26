var mongoose = require('mongoose');
var EventSchema = new mongoose.Schema({
  adminName: String,
  adminId: String,
  password: String,
  users: Array,
  targetDate: String,
  targetTime: String,
  location: Object,
  name: String
});
mongoose.model('Event', EventSchema);

module.exports = mongoose.model('Event');