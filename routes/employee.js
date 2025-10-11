const express = require('express');
const Employee = require('../models/Employee');


const router = express.Router();


/* Employee List */
router.get('/employees', async (req, res) => {

    try {

        const employees = await Employee.find();
        res.json(users);

    } 
    
    catch (err) {

        res.status(500).json({ error: err.message });
    }
});


/* Employee Creation */
router.post('/employees', async (req, res) => {

    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    if (!first_name || !last_name || !email || !date_of_joining)
        return res.status(400).json({ error: 'All fields are required' });

    try {

        const existingEmployee = await Employee.findOne({ 
            $or: [{ email }] 
        });

        if (existingEmployee)
            return res.status(400).json({ error: `Employee with email ${email} already exists` });

        const newEmployee = new Employee({
            first_name, last_name, email, position, salary, date_of_joining, department
        });

        await newEmployee.save();

        res.status(201).json({
            status: true,
            message: 'Employee successfully created',
            employee: {
                first_name: newEmployee.first_name,
                last_name: newEmployee.last_name,
                email: newEmployee.email,
                created_at: newEmployee.created_at
            }
        });
    } 
    
    catch (err) {

        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
