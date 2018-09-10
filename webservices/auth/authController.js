var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/user');
var VerifyToken = require('./verifyToken');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');


router.post('/register', function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
      name : req.body.name,
      password : hashedPassword,
      email : req.body.email,
    },
    function (err, user) {
      if (err) {
        return res.status(500).send("There was a problem registering the user.")
      }

      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }
  );
});

// e.g. http://localhost:3000/api/auth/user?user=andy15
router.get('/user', function(req, res, next) {
  const user = req.query.user;
  User.findOne({ 'name': user}, { password: 0}, function (err, user) {
    if (err) {
      return res.status(500).send("There was a problem finding the user.");
    }

    if (!user) {
      return res.status(200).send({'no_user': true});
    }

    const userData = transformUser(user);
    res.status(200).send(userData);
  });
});

transformUser = (user) => {
  return {
    username: user.name,
    userId: user._id
  }
}

// e.g. http://localhost:3000/api/auth/userexists?user=andy2
router.get('/userexists', function(req, res, next) {
  const user = req.query.user;
  User.findOne({ 'name': user}, { password: 0}, function (err, user) {
    
    if (err) {
      return res.status(500).send("There was a problem finding the user.");
    }

    let data = {};
    if (!user) {
      data = {'exists': false};
    } else {
      data = {'exists': true};
    }

    return res.status(200).send(data);
  });
});

// e.g. http://localhost:3000/api/auth/userevents - based on users auth token
router.get('/userevents', function(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    
    User.findById(decoded.id, { password: 0 }, function (err, user) {
    
      if (err) {
        return res.status(500).send("There was a problem finding the user.");
      }

      const events = {
        events: user.events,
        eventsAdmin: user.eventsAdmin
      }
  
      return res.status(200).send(events);
    });
  });
});

router.get('/authorized', function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    
    User.findById(decoded.id, { password: 0 }, function (err, user) {
      if (err) {
        return res.status(500).send("There was a problem finding the user.");
      }

      if (!user) {
        return res.status(404).send("No user found.");
      }

      res.status(200).send(user);
    });
  });
});

router.get('/users', function(req, res, next) {
  User.find({}, function (err, users) {
    if (err) return res.status(500).send("There was a problem finding the users.");
    res.status(200).send(users);
  });
});


router.post('/login', function(req, res) {
  User.findOne({ name: req.body.name }, function (err, user) {
    if (err) {
      return res.status(500).send('Error on the server.');
    }

    if (!user) {
      return res.status(404).send('No user found.');
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });
});


router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});


module.exports = router;