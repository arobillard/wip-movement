const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

require('dotenv').config();
require('./config/database');

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/classes', require('./routes/classes'));
app.use('/api/users', require('./routes/users'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = process.env.PORT || 3001;

app.listen(port, console.log(`Server running on port ${port}`));