'use strict';

var gcal    = require('google-calendar');
var bodyParser = require('body-parser');
//var Patient = mongoose.model('Patient');
exports.login = function(req, res, next) {
    if(!req.session.accessToken) {
        res.send(401, 'Not logged in.');
    } else {
        next();
    }
};

exports.list = function (req, res, next) {
    var accessToken = req.session.accessToken;
    var calendarId = req.user._doc.email;
    
    var calendar = new gcal.GoogleCalendar(accessToken);
    calendar.events.list(calendarId, {'timeMin': new Date().toISOString()}, function(err, eventList) {
        if(err) return next(err);

        res.send(JSON.stringify(eventList, null, '\t'));
    });
};

/**
 * Create a patient
 */
/*exports.create = function (req, res) {
  var patient = new Patient(req.body);
  patient.user = req.user;

  patient.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(patient);
    }
  });
};*/

/**
 * Show the current patient
 */
/*exports.read = function (req, res) {
  res.json(req.patient);
};

exports.update = function (req, res, next) {
  var patient = req.patient;
  var calendarId = req.body.patient.emailId;

  patient.patientName = req.body.patientName;
  patient.contactNumber = req.body.contactNumber;
  patient.emailId = req.body.emailId;
}*/

exports.create = function (req, res, next) {
    //map request body to google calendar data structure
    var addEventBody = {
        'status':'confirmed',
        'summary': req.body.contact.fName + ' ' + req.body.contact.lName,
        'description': req.body.contact, //+ '\n' + req.body.contact.details,
        'organizer': {
          'email': req.user._doc.email,
          'self': true
        },
        'start': {
          'dateTime': req.body.startdate,
        },
        'end': {
          'dateTime': req.body.enddate
        },
        'attendees': [
            {
              'email': req.user._doc.email,
              'organizer': true,
              'self': true,
              'responseStatus': 'needsAction'
            },
            {
              'email': req.body.contact.emailId,
              'organizer': false,
              'responseStatus': 'needsAction'
            },
            {
              'email': req.body.patient.emailId,
              'organizer': false,
              'responseStatus': 'needsAction'
            }
        ]
    };
//console.log(req.body.patient);

//var calendarId = req.body.patient.emailId;
    var calendar = new gcal.GoogleCalendar(req.session.accessToken);
    calendar.events.insert(req.user._doc.email, addEventBody, function(err, response) {
        if(err) {
            console.log(err);
            return next(err);
        }

          res.send(response);
    });

};


