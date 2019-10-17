require('custom-env').env();
const knexMode = require('../knexfile')[process.env.KNEX_MODE];
const knex = require('knex')(knexMode);
const axios = require('axios');
const {
  extractAddressPart,
  addressStringSpacesToPluses,
  handleRequestErrors,
} = require('../util/util');

exports.postStation = async (stationObj, cb = (data) => data) => {
  // make sure there's enough information to geocode first
  if ((!stationObj.zip || stationObj.zip === '') && 
    ((!stationObj.city || stationObj.city === '') || 
    (!stationObj.state || stationObj.state === ''))) {
      handleRequestErrors(null, 'Need either a valid zip-code, or both city and state');
      return;
  }
  // verify that the address is valid, using Google geocoding
  let addressString = addressStringSpacesToPluses(stationObj.streetAddress, stationObj.city, stationObj.state, stationObj.zip);
  try {
    let {data} = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?`+
      `key=${process.env.MAPS_API_KEY}&address=${addressString}`);
    if (data.status !== 'OK') {
      throw 'Cannot find address';
    } else if (data.results.length > 1) {
      throw 'Not enough information, multiple results'; // move this to client-side... drop down to select which address
    } else {
      // address is valid, add station to database!
      try {
        cb(await knex('stations').insert({
          stationname: stationObj.name,
          stationstreetaddress: `${extractAddressPart(data.results[0].address_components, 'street_number')} ${extractAddressPart(data.results[0].address_components, 'route', false)}`,
          stationcity: extractAddressPart(data.results[0].address_components, 'locality'),
          stationstate: extractAddressPart(data.results[0].address_components, 'administrative_area_level_1', false),
          stationzip: Number(extractAddressPart(data.results[0].address_components, 'postal_code')),
          needmembership: stationObj.needMembership || 0,
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
          placeid: data.results[0].place_id
        }));
      } catch (err) {
        handleRequestErrors(err, 'Error in inserting station data');
        return;
      }
    }
  } catch (err) {
    handleRequestErrors(err, 'Invalid address');
    return;
  }

}

exports.postPrice = async (priceObj, cb = (data) => data) => {
  try {
    cb(await knex('prices').insert({
      price: priceObj.price,
      stationid: priceObj.stationId,
      reporttime: priceObj.reportTime,
      octaneid: priceObj.octaneId,
    }));
  } catch (err) {
    handleRequestErrors(err, 'Error in inserting price data');
    return;
  }
}

exports.postReview = async (reviewObj, cb = (data) => data) => {
  try {
    cb(await knex('reviews').insert({
      stationid: reviewObj.stationId,
      reviewerid: reviewObj.reviewerId,
      reviewtime: reviewObj.reviewTime,
      reviewrating: reviewObj.reviewRating,
      reviewdescription: reviewObj.reviewDescription,
    }));
  } catch (err) {
    handleRequestErrors(err, 'Error in inserting review');
    return;
  }
}