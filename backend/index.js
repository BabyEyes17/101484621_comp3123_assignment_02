const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");

const userRouter = require('./routes/user');
const employeeRouter = require('./routes/employee');



/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));



/* Middleware */
app.use(express.json());
app.use(cors({
  origin: "*",
}));

app.use("/uploads", express.static("uploads"));



/* Routes */
app.use('/api/v1/user', userRouter);
app.use('/api/v1/emp', employeeRouter);

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/', (req, res) => {
  res.send('API is running on Vercel');
});



/* Server */
const PORT = process.env.PORT || 3000;

if (process.env.VERCEL) {
  module.exports = app;
} 

else {
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
