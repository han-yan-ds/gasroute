require('custom-env').env();
const knexMode = require('../knexfile')[process.env.KNEX_MODE];
const knex = require('knex')(knexMode);
const modelPatch = require('./modelPatch');

exports.archiveStation = async (stationId, cb = (data) => data) => {
  // should I delete station or merely archive it?????  deleting will mean I'll delete every price and review ever gotten from it
}

exports.deletePrice = async (priceId, cb = (data) => data) => {
  try {
    let foundPriceId = await knex('prices').where({priceid: priceId}).select('flagged');
    if (foundPriceId.length === 0) { // price id not found
      console.error('PriceId not found');
      return;
    } else if (Number(foundPriceId[0].flagged) === 0) { // price isn't flagged
      console.error('Price wasn\'t flagged for removal.  It\'s flagged now, call delete again to delete permanently.');
      cb(await modelPatch.toggleFlagPrice({priceId, flagged: 1}));
    } else { // price is flagged, ready to delete
      cb(await knex('prices').where({priceid: priceId}).del());
    }
  } catch(err) {
    console.error('Error deleting price');
    return;
  }
} 

exports.deleteReview = async (reviewId, cb = (data) => data) => {
  try {
    let foundReviewId = await knex('reviews').where({reviewid: reviewId}).select('flagged');
    if (foundReviewId.length === 0) { // review id not found
      console.error('ReviewId not found');
      return;
    } else if (Number(foundReviewId[0].flagged) === 0) { // review isn't flagged
      console.error('Review wasn\'t flagged for removal.  It\'s flagged now, call delete again to delete permanently.');
      cb(await modelPatch.toggleFlagReview({reviewId, flagged: 1}));
    } else { // review is flagged, ready to delete
      cb(await knex('reviews').where({reviewid: reviewId}).del());
    }
  } catch(err) {
    console.error('Error deleting review');
    return;
  }
}