const mongoose = require('mongoose');

const usersCollection = 'users';

/* -------------- SCHEMA -------------- */
const UserSchema = new mongoose.Schema({
    username: {type: String, require: true, max: 100},
    password: {type: String, require: true, max: 30},
    name: {type: String, require: true, max: 100},
    address: {type: String, require: true, max: 50},
    phoneNumber: {type: String, require: true, max: 20},
    admin: {type: Boolean, default: false}
});

module.exports = mongoose.model(usersCollection, UserSchema);