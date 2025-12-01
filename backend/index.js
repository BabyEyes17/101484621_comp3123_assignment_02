const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");

/* CORS FIX */
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://101484621-comp3123-assignment-02-240o6fwyl.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* Body Parser */
app.use(express.json());

/* Static Uploads */
app.use("/uploads", express.static("uploads"));

/* Routes */
const userRouter = require('./routes/user');
const employeeRouter = require('./routes/employee');

app.use('/api/v1/user', userRouter);
app.use('/api/v1/emp', employeeRouter);

/* Root */
app.get('/', (req, res) => {
  res.send('API is running on Render');
});

/* Mongoose */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error(err));

/* Export for Vercel */
const PORT = process.env.PORT || 3000;
if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}
