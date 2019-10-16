const modelPost = require('./modelPost');
const moment = require('moment');

exports.postStation = async (req, res) => {
  // remove
  let testBody = {
    name: 'Sinclair',
    streetAddress: '1121 E Alameda Ave',
    zip: 80209,
    needMembership: 0,
  };
  // remove
  let response = await modelPost.postStation(testBody);
  res.json(response);
}

exports.postPrice = async (req, res) => {
  // remove
  let testPrice = {
    price: 3.49,
    stationId: 1,
    reportTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    octaneId: 4,
  };
  // remove
  let response = await modelPost.postPrice(testPrice);
  res.json(response);
}

exports.postReview = async (req, res) => {
  // remove
  let testReview = {
    stationId: 1,
    userId: 1,
    reviewTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    reviewRating: 4,
    reviewDescription: "There's gas here",
  };
  // remove
  let response = await modelPost.postReview(testReview);
  res.json(response);
}

// exports.postUser