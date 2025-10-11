const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');


const router = express.Router();


/* User List */
router.get('/userlist', async (req, res) => {

    try {

        const users = await User.find();
        res.json(users);

    } 
    
    catch (err) {

        res.status(500).json({ error: err.message });
    }
});


/* User Signup */
router.post('/signup', async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password)
        return res.status(400).json({ error: 'All fields are required' });

    try {

        const existingUser = await User.findOne({ 
            $or: [{ username }, { email }] 
        });

        if (existingUser)
            return res.status(400).json({ error: 'Username or email already exists' });


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({

            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            status: true,
            message: 'Signup successful',
            user: {
                username: newUser.username,
                email: newUser.email,
                created_at: newUser.created_at
            }
        });

    } 
    
    catch (err) {

        res.status(500).json({ error: err.message });
    }
});


/* User Login */
router.post('/login', async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ error: 'Username and password are required' });

    try {

        const user = await User.findOne({ username });

        if (!user)
            return res.json({ status: false, message: 'Username is invalid' });


        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword)
            return res.json({ status: false, message: 'Password is invalid' });


        res.json({ status: true, message: 'User is valid' });

    } 
    
    catch (err) {

        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
