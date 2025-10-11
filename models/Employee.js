const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email:    { type: String, required: true},
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});

module.exports = mongoose.model('User', userSchema);
