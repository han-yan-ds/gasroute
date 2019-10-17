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

exports.flagPrice = async (req, res) => {
  let response = await modelPatch.toggleFlagPrice({
    priceId: Number(req.params.priceid),
    flagged: 1,
  });
  res.json(response);
}

exports.unflagPrice = async (req, res) => {
  let response = await modelPatch.toggleFlagPrice({
    priceId: Number(req.params.priceid),
    flagged: 0,
  });
  res.json(response);
}

exports.flagReview = async (req, res) => {
  let response = await modelPatch.toggleFlagReview({
    reviewId: Number(req.params.reviewid),
    flagged: 1,
  });
  res.json(response);
}

exports.unflagReview = async (req, res) => {
  let response = await modelPatch.toggleFlagReview({
    reviewId: Number(req.params.reviewid),
    flagged: 0,
  });
  res.json(response);
}