const model = require('./model');

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