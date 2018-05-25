const mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(`mongodb://${config.user}:${config.pass}@ds135290.mlab.com:35290/event_cal`);