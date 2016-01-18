//database
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonalSchema = new Schema({
    created: {
    type: Date,
    default: Date.now
    },
    fName: {
        type: String,
        default: '',
        required: 'Please fill your first name',
        trim: true
    },
    lName: {
        type: String,
        default: '',
        required: 'Please fill your last name',
        trim: true
    },
      qualification: {
        type: String,
        default: '',
        required: 'Please fill your email id',
        trim: true
    },
    experience: {
        type: String,
        default: '',
        required: 'Please fill your contact number',
        trim: true
    },
    emailId: {
        type: String,
        default: '',
        required: 'Please fill your email id',
        trim: true
    },
    contact: {
        type: String,
        default: '',
        required: 'Please fill your contact number',
        trim: true
    },
    treatment: {
        type: String,
        default: '',
        required: 'Please fill treatment',
        trim: true
    },
    duration: {
        type: String,
        default: '',
        required: 'Please fill duration',
        trim: true
    },
    isConsultant: {
        type: Boolean
    },
    speciality: {
        type: String,
        default: '',
        trim: true
    },
    user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Personal', PersonalSchema);