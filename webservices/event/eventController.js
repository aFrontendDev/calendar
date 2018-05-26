const Event = require('./event');
const bcrypt = require('bcryptjs');
const { addEventToUser } = require('../user/userController');

module.exports = {

  updateEvent(id, userId, targetDate, targetTime, locationName, locationLat, locationLon) {
    const options = {new: true};

    return new Promise( (resolve, reject) => {
      Event.findById(id, (err, event) => {
        if (err) {
          reject ({err});
        }

        const eventAdminId = event.adminId;
        if (userId !== eventAdminId) {
          reject ({status: 500, err: 'unauthorized'});
        }

        let updateObj = {};
        const location = event.location;

        if (targetDate && targetDate.length > 0) {
          updateObj['targetDate'] = targetDate;
        }

        if (targetTime && targetTime.length > 0) {
          updateObj['targetTime'] = targetTime;
        }

        if (locationName && locationName.length > 0) {
          location['name'] = locationName;
        }

        if (locationLat && locationLat.length > 0) {
          location['lat'] = locationLat;
        }

        if (locationLon && locationLon.length > 0) {
          location['lon'] = locationLon;
        }

        updateObj['location'] = location;

        Event.findByIdAndUpdate(id, updateObj, options, (err, data) => {
          if (err) {
            reject ({err});
          }
          resolve ({data});
        })
      })
    });
  },

  addUserToEvent(id, username, userId) {
    const options = {};

    return new Promise( (resolve, reject) => {
      Event.findById(id, (err, event) => {
        if (err) {
          reject ({err});
        }

        const users = event.users;
        users.push({name: username, id: userId});

        Event.findByIdAndUpdate(id, { users }, options, (err, event) => {
          if (err) {
            reject ({err});
          }

          const eventObj = {
            userId,
            eventId: id,
            admin: false,
            eventName: event.name,
            targetDate: event.targetDate
          };

          addEventToUser(eventObj)
            .then(response => {
              resolve ({
                eventUpdate: event,
                userUpdate: response
              });
            })
            .catch(err => {
              resolve ({
                eventUpdate: event,
                userUpdate: err
              });
            })
        })
      })
    });
  },

  getEvent(id) {

    return new Promise( (resolve, reject) => {
      Event.findById(id, (err, data) => {
        if (err) {
          reject ({err});
        }

        resolve ({data});
      })
    });
  },

  newEvent(eventObj) {
    const { adminName, adminId, password, targetDate, targetTime, locationName, locationLat, locationLon, name } = eventObj;

    const hashedPassword = bcrypt.hashSync(password, 8);
    const location = {};
    location['name'] = locationName;
    location['lat'] = locationLat;
    location['lon'] = locationLon;

    return new Promise( (resolve, reject) => {
      Event.create({
          adminName,
          adminId,
          password: hashedPassword,
          targetDate,
          targetTime,
          location,
          name
        },
        (err, event) => {

          if (err) {
            reject ({err});
          }

          const eventObj = {
            userId: adminId,
            eventId: event._id,
            admin: true,
            eventName: event.name,
            targetDate: event.targetDate
          };

          addEventToUser(eventObj)
            .then(response => {
              resolve ({
                eventUpdate: event,
                userUpdate: response
              });
            })
            .catch(err => {
              resolve ({
                eventUpdate: event,
                userUpdate: err
              });
            })
        }
      );
    });
  }

}