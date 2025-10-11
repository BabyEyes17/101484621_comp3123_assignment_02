const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    position: { type: String, required: false },
    salary: { type: Number, required: false },
    date_of_joining: { type: Date, required: true },
    department: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Employee', employeeSchema);
