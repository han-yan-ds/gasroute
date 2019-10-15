const model = require('./model');
const moment = require('moment');

exports.postStation = async (req, res) => {
  let testBody = {
    name: 'Sinclair Washington Park',
    streetaddress: '1121 E Alameda Ave',
    zip: 80209,
    needMembership: 0,
  }
  let response = await model.postStation(testBody);

  // console.log(req.body);
  // let response = await model.postStation(req.body);
  res.json(response);
}

exports.postPrice = async (req, res) => {
  let testPrice = {
    price: 2.59,
    stationid: 1,
    reporttime: moment().format('YYYY-MM-DD HH:mm:ss'),
    octaneid: 1,
  }
  let response = await model.postPrice(testPrice);
  res.json(response);
}