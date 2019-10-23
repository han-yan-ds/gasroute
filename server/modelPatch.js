require('custom-env').env();
const knexMode = require('../knexfile')[process.env.KNEX_MODE];
const knex = require('knex')(knexMode);
const {handleRequestErrors} = require('../util/util');

exports.patchStation = async (testBody, cb = (data) => data) => {
  let stationid = testBody.stationid;
  delete testBody.stationid;
  try {
    cb(await knex('stations').where({stationid}).update(testBody));
  } catch (err) {
    handleRequestErrors(err, 'Error Updating Station Info');
    return;
  }
}

exports.toggleFlagPrice = async (priceBody, cb = (data) => data) => {
  try {
    let foundPriceId = await knex('prices').where({priceid: priceBody.priceId}).select();
    if (foundPriceId.length === 0) { // price id not found
      handleRequestErrors(null, 'PriceId not found');
      return;
    } else { // price id found
      cb(await knex('prices').where({
        priceid: priceBody.priceId
      }).update({
        flagged: priceBody.flagged
      }));
    }
  } catch (err) {
    handleRequestErrors(err, 'Error flagging/unflagging price');
    return;
  }
}

exports.toggleFlagReview = async (reviewBody, cb = (data) => data) => {
  try {
    let foundReviewId = await knex('reviews').where({reviewid: reviewBody.reviewId}).select();
    if (foundReviewId.length === 0) { // review id not found
      handleRequestErrors(null, 'ReviewId not found');
      return;
    } else {
      cb(await knex('reviews').where({
        reviewid: reviewBody.reviewId
      }).update({
        flagged: reviewBody.flagged
      }));
    }
  } catch (err) {
    handleRequestErrors(err, 'Error flagging/unflagging price');
    return;
  }
}