const PORT = 4000;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const {
  postStation,
  postPrice,
  // postUser,
  postReview
} = require('./controllerPost');

const {
  patchStation,
  // patchUser,
  // flagPrice,
  // flagReview,
} = require('./controllerPatch');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// app.get('/stations'); // get X (default 6) closest stations to a given location, and with given octane rating
  // ^ will also grab prices from these stations
  // ^ will also grab average rating from these stations
// app.get('/stations/single'); // grab a single station, returns gas prices and reviews
app.post('/stations', postStation); // report new station
app.post('/prices', postPrice); // report new price
// app.post('/users', postUser); // add new user
app.post('/reviews', postReview); // submit new review
app.patch('/stations', patchStation); // update station information
// app.patch('/users'); // update user information 
// app.patch('/prices/flag'); // flags a price
// app.patch('/reviews/flag'); // flags a review
// app.delete('/stations'); // delete station if no longer exists
// app.delete('/prices'); // deletes a price
// app.delete('/reviews'); // deletes a review


app.listen(PORT, () => `Server is listening on port ${PORT}`);