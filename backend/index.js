const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

/* ---------------------------------------------
   CORS — must be FIRST middleware
----------------------------------------------*/
const allowedOrigins = [
  "https://101484621-comp3123-assignment-02-7ly7x3q2i.vercel.app",
  "https://101484621-comp3123-assignment-02-240o6fwyl.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options(/.*/, cors());


// Handle preflight requests
app.options("*", cors());

/* Body Parser */
app.use(express.json());

/* MongoDB */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error(err));

/* Static files */
app.use("/uploads", express.static("uploads"));

/* Routers */
const userRouter = require('./routes/user');
const employeeRouter = require('./routes/employee');

app.use('/api/v1/user', userRouter);
app.use('/api/v1/emp', employeeRouter);

/* Test Route */
app.get('/', (req, res) => {
  res.send('API is running');
});

/* Render / Local compatibility */
const PORT = process.env.PORT || 3000;
if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}
