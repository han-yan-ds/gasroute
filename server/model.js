const {development} = require('../knexfile');
const knex = require('knex')(development);

exports.postStation = async (stationObj) => {
  try {
    await knex('gasstations').insert({
      stationname: stationObj.name,
      stationstreetaddress: stationObj.streetAddress,
      stationzip: stationObj.zip,
      needmembership: stationObj.needMembership || 0,
    })
  } catch (err) {
    console.error('Error in inserting post data');
    // console.error(err);
  }
  // try {
  //   // now try to insert city, state, latitude, longitude, from
  //   // google maps
  // }
}