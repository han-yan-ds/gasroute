require('custom-env').env();
const knexMode = require('../../knexfile')[process.env.KNEX_MODE];
const knex = require('knex')(knexMode);
const modelPatch = require('./modelPatch');
const {handleRequestErrors} = require('../../util/util');

exports.archiveStation = async (stationId, cb = (data) => data) => {
  // should I delete station or merely archive it?????  deleting will mean I'll delete every price and review ever gotten from it
  try {
    let foundStationId = await knex('stations').where({stationid: stationId, archived: 0}).select();
    if (foundStationId.length === 0) { // non-archived station id not found
      handleRequestErrors(null, 'StationId not found');
      return;
    } else { // station id is found
      cb(await knex('stations').where({stationid: stationId}).update({archived: 1}));
    }
  } catch (err) {
    handleRequestErrors(err, 'Error archiving station');
    return;
  }
}

exports.deletePrice = async (priceId, cb = (data) => data) => {
  try {
    let foundPriceId = await knex('prices').where({priceid: priceId}).select('flagged');
    if (foundPriceId.length === 0) { // price id not found
      handleRequestErrors(null, 'PriceId not found');
      return;
    } else if (Number(foundPriceId[0].flagged) === 0) { // price isn't flagged
      handleRequestErrors(null, 'Price wasn\'t flagged for removal.  It\'s flagged now, call delete again to delete permanently.');
      cb(await modelPatch.toggleFlagPrice({priceId, flagged: 1}));
    } else { // price is flagged, ready to delete
      cb(await knex('prices').where({priceid: priceId}).del());
    }
  } catch(err) {
    handleRequestErrors(err, 'Error deleting price');
    return;
  }
} 

exports.deleteReview = async (reviewId, cb = (data) => data) => {
  try {
    let foundReviewId = await knex('reviews').where({reviewid: reviewId}).select('flagged');
    if (foundReviewId.length === 0) { // review id not found
      handleRequestErrors(null, 'ReviewId not found');
      return;
    } else if (Number(foundReviewId[0].flagged) === 0) { // review isn't flagged
      handleRequestErrors(null, 'Review wasn\'t flagged for removal.  It\'s flagged now, call delete again to delete permanently.');
      cb(await modelPatch.toggleFlagReview({reviewId, flagged: 1}));
    } else { // review is flagged, ready to delete
      cb(await knex('reviews').where({reviewid: reviewId}).del());
    }
  } catch(err) {
    handleRequestErrors(err, 'Error deleting review');
    return;
  }
}