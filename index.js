const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const userRouter = require('./routes/user');
const employeeRouter = require('./routes/employee');


/* MongoDB Connection */
mongoose.connect('mongodb+srv://jayden-lewis:admin@comp3123-cluster.njwrjmg.mongodb.net/comp3123_assigment1')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));


/* Middleware */
app.use(express.json());


/* Routes */
app.use('/api/v1/user', userRouter);
app.use('/api/v1/emp', employeeRouter);

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});


/* Server */
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
