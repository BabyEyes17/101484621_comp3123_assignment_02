const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

0.
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

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username || email.split("@")[0], 
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      status: true,
      message: "Signup successful",
      user: {
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* User Login */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const jwt = require("jsonwebtoken");
    const SECRET = "mysecret";

    // Validate inputs
    if (!email || !password) {
        return res.status(400).json({ 
            error: 'Email and password are required' 
        });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ 
                status: false, 
                message: 'Email is invalid' 
            });
        }

        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ 
                status: false, 
                message: 'Password is invalid' 
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            SECRET,
            { expiresIn: '1d' }
        );

        // Success response
        return res.json({
            status: true,
            message: 'Login successful',
            token
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
