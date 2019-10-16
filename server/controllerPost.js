const modelPost = require('./modelPost');
const moment = require('moment');

exports.postStation = async (req, res) => {
  // remove
  let testBody = {
    stationName: 'Conoco',
    stationStreetAddress: '1690 Pearl St, Denver, CO 80203',
    stationZip: 80203,
    needMembership: 0,
  };
  // remove
  let response = await modelPost.postStation(testBody);
  res.json(response);
}

exports.postPrice = async (req, res) => {
  // remove
  let testPrice = {
    price: 2.69,
    stationId: 2,
    reportTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    octaneId: 1,
  };
  // remove
  let response = await modelPost.postPrice(testPrice);
  res.json(response);
}

exports.postReview = async (req, res) => {
  // remove
  let testReview = {
    stationId: 2,
    reviewerId: 1,
    reviewTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    reviewRating: 4,
    reviewDescription: "There's closer gas here",
  };
  // remove
  let response = await modelPost.postReview(testReview);
  res.json(response);
}

// exports.postUser
  // register new user