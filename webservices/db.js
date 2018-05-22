const mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(`mongodb://${config.user}:${config.pass}@ds231460.mlab.com:31460/event_users`);