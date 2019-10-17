require('custom-env').env();
const knexMode = require('../knexfile')[process.env.KNEX_MODE];
const knex = require('knex')(knexMode);

exports.patchStation = async (testBody, cb = (data) => data) => {
  let placeid = testBody.placeid;
  delete testBody.placeid;
  try {
    cb(await knex('stations').where({placeid}).update(testBody));
  } catch (err) {
    console.error('Error Updating Station Info');
    return;
  }
}

exports.toggleFlagPrice = async (priceBody, cb = (data) => data) => {
  try {
    let foundPriceId = await knex('prices').where({priceid: priceBody.priceId}).select();
    if (foundPriceId.length === 0) { // price id not found
      console.error('PriceId not found');
      return;
    } else { // price id found
      cb(await knex('prices').where({
        priceid: priceBody.priceId
      }).update({
        flagged: priceBody.flagged
      }));
    }
  } catch (err) {
    console.error('Error flagging/unflagging price');
    return;
  }
}

exports.toggleFlagReview = async (reviewBody, cb = (data) => data) => {
  try {
    let foundReviewId = await knex('reviews').where({reviewid: reviewBody.reviewId}).select();
    if (foundReviewId.length === 0) { // review id not found
      console.error('ReviewId not found');
      return;
    } else {
      cb(await knex('reviews').where({
        reviewid: reviewBody.reviewId
      }).update({
        flagged: reviewBody.flagged
      }));
    }
  } catch (err) {
    console.error('Error flagging/unflagging price');
    return;
  }
}