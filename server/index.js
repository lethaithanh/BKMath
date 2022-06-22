/**
 * @require: express, dotenv, mongoose
 */
const express = require('express');
const app = express(); // Express framework
require('dotenv').config(); // Environtment variables
const mongoose = require('mongoose');
const authRouter = require('./routes/auth'); // For auth routes: register and login

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

/**
 * Routes:
 *  1. Register & Login
 */
app.use(express.json()); // Express JSON
app.use('/api/auth', authRouter);

/**
 * Port 5050 for server
 */
const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Server started on port: ${port}`));
