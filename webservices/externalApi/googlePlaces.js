const fetch = require('node-fetch');
const config = require('../config');
const Raven = require('../raven');
const cache = require('../cache');

module.exports = {

  placeSearch(searchTerm = '') {

    // check if we have cached version
    const cachedVersion = cache.googleplacesCache[searchTerm];
    if (cachedVersion) {
      return (Promise.resolve(cachedVersion));
    }

    return fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchTerm}&key=${config.googleapiKey}`)
      .then(res => {
        if (res.status !== 200) {
          // log error
          Raven.captureException(res);
          return null
        }

        return res.json()
          .then(json => {
            cache.googleplacesCache[searchTerm] = json.results;
            return json.results
          })
      })
      .catch(err => {
        Raven.captureException(err);
        return null;
      })
  }

}