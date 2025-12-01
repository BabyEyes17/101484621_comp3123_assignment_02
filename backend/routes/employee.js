const express = require('express');
const router = express.Router();

const Employee = require('../models/Employee');
const auth = require("../auth");
const multer = require("multer");



/* Employee Profile Image Upload Setup */
const storage = multer.diskStorage({
  
  destination: "uploads/",
  
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });



/* Employee List */
router.get('/employees', async (req, res) => {

    try {

        const employees = await Employee.find();
        res.json(employees);
    } 
    
    catch (err) {

        res.status(500).json({ error: err.message });
    }
});



/* Get Employee By ID */
router.get('/employees/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const employee = await Employee.findById(id);

        if (!employee)
            return res.status(404).json({ error: `Employee with ID: ${id} not found` });

        res.json(employee);
    } 
    
    catch (err) {

        res.status(500).json({ error: err.message });
    }
});



/* Create Employee */
router.post('/employees', auth, upload.single("profileImage"), async (req, res) => {

    const profileImageUrl = req.file ? `/uploads/${req.file.filename}` : null;
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
            first_name, last_name, email, position, salary, date_of_joining, department, profileImageUrl
        });

        await newEmployee.save();

        res.status(201).json({
            status: true,
            message: 'Employee successfully created',
            newEmployee
        });
    } 
    
    catch (err) {

        res.status(500).json({ error: err.message });
    }
});



/* Update Employee */
router.put('/employees/:id', auth, upload.single("profileImage"), async (req, res) => {

    const { id } = req.params;
    const updates = req.body;

    try {
        
        if (req.file) {
            updates.profileImageUrl = `/uploads/${req.file.filename}`;
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            id, 
            { ...updates, updated_at: Date.now() }, 
            { new: true, runValidators: true }
        );

        if (!updatedEmployee)
            return res.status(404).json({ error: `Employee with ID: ${id} not found` });

        res.json({
            status: true,
            message: 'Employee successfully updated',
            updatedEmployee
        });
    } 
    
    catch (err) {

        res.status(500).json({ error: err.message });
    }
})



/* Delete Employee */
router.delete('/employees/:id', auth, async (req, res) => {

    const { id } = req.params;

    try {

        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee)
            return res.status(404).json({ error: `Employee with ID: ${id} not found` });

        res.json({
            status: true,
            message: 'Employee successfully deleted',
            deletedEmployee
        });
    } 
    
    catch (err) {

        res.status(500).json({ error: err.message });
    }
});



/* Search Employee */
router.get("/employees/search", async (req, res) => {
  
    const { department, position } = req.query;

  const query = {};

  if (department) query.department = department;
  
  if (position) query.position = position;

  try {
    
    const results = await Employee.find(query);
    res.json(results);
  } 
  
  catch (err) {

    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
