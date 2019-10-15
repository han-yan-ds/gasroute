const PORT = 4000;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const {
  postStation,
  postPrice
} = require('./controller');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.post('/stations', postStation); // report new station
app.post('/prices', postPrice); // report new price
// app.post('/reviews', postReview); // submit new review

app.listen(PORT, () => `Server is listening on port ${PORT}`);