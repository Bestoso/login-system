const mongoose = require('mongoose');

const collecion = 'users';

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
});

const usersModel = mongoose.model(collecion, usersSchema);
module.exports = usersModel;