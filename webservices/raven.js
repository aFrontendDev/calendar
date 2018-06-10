var Raven = require('raven');
Raven.config('https://0cd9cda52bf347e1a78629c65c92dbaa@sentry.io/1222685').install();

module.exports = Raven;