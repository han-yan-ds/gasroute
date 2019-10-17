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
    cb(await knex('prices').where({
      priceid: priceBody.priceId
    }).update({
      flagged: priceBody.flagged
    }));
  } catch (err) {
    console.error('Error flagging/unflagging price');
    return;
  }
}

exports.toggleFlagReview = async (reviewBody, cb = (data) => data) => {
  try {
    cb(await knex('reviews').where({
      reviewid: reviewBody.reviewId
    }).update({
      flagged: reviewBody.flagged
    }));
  } catch (err) {
    console.error('Error flagging/unflagging price');
    return;
  }
}