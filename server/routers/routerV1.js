const routerV1 = require('express').Router();

const {
  // getStations,
  getSingleStation,
} = require('../controllers/controllerGet');

const {
  postStation,
  postPrice,
  // postUser,
  postReview
} = require('../controllers/controllerPost');

const {
  patchStation,
  // patchUser,
  flagPrice,
  unflagPrice,
  flagReview,
  unflagReview
} = require('../controllers/controllerPatch');

const {
  archiveStation,
  deletePrice,
  deleteReview,
} = require('../controllers/controllerDelete');

// routerV1.get('/stations', getStations); // get X (default 6) closest stations to a given location, and with given octane rating
// ^ will also grab prices from these stations
// ^ will also grab average rating from these stations
routerV1.get('/stations/:stationid', getSingleStation); // grab a single station, returns gas prices and reviews
routerV1.post('/stations', postStation); // report new station
routerV1.post('/prices', postPrice); // report new price
// routerV1.post('/users', postUser); // add new user
routerV1.post('/reviews', postReview); // submit new review
routerV1.patch('/stations/:stationid', patchStation); // update station information
// routerV1.patch('/users'); // update user information 
routerV1.patch('/prices/flag/:priceid', flagPrice); // flags a price
routerV1.patch('/prices/unflag/:priceid', unflagPrice); // flags a review
routerV1.patch('/reviews/flag/:reviewid', flagReview); // flags a review
routerV1.patch('/reviews/unflag/:reviewid', unflagReview); // flags a review
routerV1.delete('/stations/:stationid', archiveStation); // delete station if no longer exists
routerV1.delete('/prices/:priceid', deletePrice); // deletes a price
routerV1.delete('/reviews/:reviewid', deleteReview); // deletes a review

module.exports = routerV1;