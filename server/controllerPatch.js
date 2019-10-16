const modelPatch = require('./modelPatch');

exports.patchStation = async (req, res) => {
  let testBody = {
    stationname: 'Conoco Uptown',
    // stationstreetaddress: ,
    // stationcity: ,
    // stationstate: ,
    // stationzip: ,
    // needmembership: ,
    placeid: 'ChIJgSnWdCx5bIcROrkieGcWUck'
  };
  let response = await modelPatch.patchStation(testBody);
  res.json(response);
}