const modelDelete = require('./modelDelete');

exports.deleteStation = async (req, res) => {
  // need to delete all prices and reviews related to this station TOO
}

exports.deletePrice = async (req, res) => {
  let response = await modelDelete.deletePrice(Number(req.params.priceid));
  res.json(response);
}

exports.deleteReview = async (req, res) => {
  let response = await modelDelete.deleteReview(Number(req.params.reviewid));
  res.json(response);
}