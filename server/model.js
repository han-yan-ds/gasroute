const {development} = require('../knexfile');
const knex = require('knex')(development);

exports.postStation = async (stationObj) => {
  try {
    await knex('stations').insert({
      stationname: stationObj.name,
      stationstreetaddress: stationObj.streetAddress,
      stationzip: stationObj.zip,
      needmembership: stationObj.needMembership || 0,
      // below are experimental
      stationcity: 'Denver',
      stationstate: 'CO',
      latitude: 60,
      longitude: 40,
    })
  } catch (err) {
    console.error('Error in inserting station data');
    // console.error(err);
  }
  // try {
  //   // now try to insert city, state, latitude, longitude, from
  //   // google maps
  // }
}

exports.postPrice = async (priceObj) => {
  try {
    await knex('prices').insert({
      price: priceObj.price,
      stationid: priceObj.stationid,
      reporttime: priceObj.reporttime,
      octaneid: priceObj.octaneid,
    });
  } catch (err) {
    // console.error('Error in inserting price data');
    console.error(err);
  }
}