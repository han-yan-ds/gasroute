const modelGet = require('../models/modelGet');

exports.getStations = async (req, res) => {
  let testBody = {
    lat: 43,
    long: -110,
    limit: 6,
  };
  let response = await modelGet.getStations(testBody.lat, testBody.long, testBody.limit);
  res.json(response);
}

exports.getSingleStation = async (req, res) => {
  let response = await modelGet.getSingleStation(Number(req.params.stationid));
  res.json(response);
}