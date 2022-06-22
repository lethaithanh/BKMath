// Express framework
const express = require('express');
const app = express();
// Environtment variables
require('dotenv').config();
// MongoDB
const mongoose = require('mongoose');

app.get('/', (req, res) => res.send('Hello world'));

// Port 5050 for server
const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Server started on port: ${port}`));
