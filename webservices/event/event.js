var mongoose = require('mongoose');
var EventSchema = new mongoose.Schema({
  adminName: String,
  adminId: String,
  password: String,
  users: Array,
  targetDate: String,
  targetTimeFrom: String,
  targetTimeTo: String,
  location: Object,
  name: String,
  description: String
});
mongoose.model('Event', EventSchema);

module.exports = mongoose.model('Event');