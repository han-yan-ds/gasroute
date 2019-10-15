const model = require('./model');
const moment = require('moment');

exports.postStation = async (req, res) => {
  let testBody = {
    name: 'Sinclair Washington Park',
    streetAddress: '1121 E Alameda Ave',
    zip: 80209,
    needMembership: 0,
  }
  let response = await model.postStation(testBody);
  res.json(response);
}

exports.postPrice = async (req, res) => {
  let testPrice = {
    price: 2.59,
    stationId: 1,
    reportTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    octaneId: 1,
  }
  let response = await model.postPrice(testPrice);
  res.json(response);
}