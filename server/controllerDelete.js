const modelDelete = require('./modelDelete');

exports.archiveStation = async (req, res) => {
  // should I delete station or merely archive it?????  deleting will mean I'll delete every price and review ever gotten from it
  let response = await modelDelete.archiveStation(Number(req.params.stationid));
  res.json(response);
}

exports.deletePrice = async (req, res) => {
  let response = await modelDelete.deletePrice(Number(req.params.priceid));
  res.json(response);
}

exports.deleteReview = async (req, res) => {
  let response = await modelDelete.deleteReview(Number(req.params.reviewid));
  res.json(response);
}