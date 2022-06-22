/**********************************************************************
 * @require: express, dotenv, mongoose
 */
const express = require('express'); // Express framework
const app = express(); // Express APP
require('dotenv').config(); // Environtment variables
const mongoose = require('mongoose'); // MongoDB
const userRouter = require('./routes/user'); // For user routes

/**********************************************************************
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

/**********************************************************************
 * Routes:
 *  1. Register & Login
 *  2. Create = Register, Read, Update, Delete
 */
app.use(express.json()); // Express JSON
app.use('/api/users', userRouter);

/**********************************************************************
 * Port 5050 for server
 */
const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Server started on port: ${port}`));

/**********************************************************************/
