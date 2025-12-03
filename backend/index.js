const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

/* ---------------------------------------------
   CORS — must be FIRST middleware
----------------------------------------------*/
const allowedOrigins = [
  "http://localhost:3000" // React frontend in Docker
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options(/.*/, cors());

/* Body Parser */
app.use(express.json());

/* ---------------------------------------------
   MongoDB Connection
----------------------------------------------*/
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error(err));

/* ---------------------------------------------
   Static files (uploads)
----------------------------------------------*/
app.use("/uploads", express.static("uploads"));

/* ---------------------------------------------
   Routers
----------------------------------------------*/
const userRouter = require('./routes/user');
const employeeRouter = require('./routes/employee');

app.use('/api/v1/user', userRouter);
app.use('/api/v1/emp', employeeRouter);

/* Test Route */
app.get('/', (req, res) => {
  res.send('API is running');
});

/* ---------------------------------------------
   DOCKER-COMPATIBLE SERVER LISTENING
----------------------------------------------*/
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
