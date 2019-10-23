require('custom-env').env();
const knexMode = require('../knexfile')[process.env.KNEX_MODE];
const knex = require('knex')(knexMode);
const {handleRequestErrors} = require('../util/util');
const {DEFAULT_GET_STATION_LIMIT} = require('../util/defaults');

exports.getStations = async (lat, long, limit = DEFAULT_GET_STATION_LIMIT) => {
  
}

exports.getSingleStation = async (stationId) => {
  let stationInfo = await knex('stations').where({
    stationid: stationId, archived: 0
  }).select();
  // if not found:
  if (stationInfo.length === 0) {
    handleRequestErrors(null, 'Station doesn\'t exist');
    return;
  }
  let prices = await knex('prices').where({
    stationid: stationId
  }).select();
  let reviews = await knex('reviews').where({
    stationid: stationId,
  }).select();

  return {
    stationInfo,
    prices,
    reviews
  }
}