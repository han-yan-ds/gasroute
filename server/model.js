require('custom-env').env();
const {development} = require('../knexfile');
const knex = require('knex')(development);
const {
  extractAddressPart,
  addressStringSpacesToPluses
} = require('../util/util');
const axios = require('axios');

exports.postStation = async (stationObj) => {
  // make sure there's enough information to geocode first
  if ((!stationObj.zip || stationObj.zip === '') && 
    ((!stationObj.city || stationObj.city === '') || 
    (!stationObj.state || stationObj.state === ''))) {
      console.error('Need either a valid zip-code, or both city and state');
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
        await knex('stations').insert({
          stationname: stationObj.name,
          stationstreetaddress: `${extractAddressPart(data.results[0].address_components, 'street_number')} ${extractAddressPart(data.results[0].address_components, 'route', false)}`,
          stationcity: extractAddressPart(data.results[0].address_components, 'locality'),
          stationstate: extractAddressPart(data.results[0].address_components, 'administrative_area_level_1', false),
          stationzip: Number(extractAddressPart(data.results[0].address_components, 'postal_code')),
          needmembership: stationObj.needMembership || 0,
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
          placeid: data.results[0].place_id
        })
      } catch (err) {
        console.error('Error in inserting station data');
        return;
      }
    }
  } catch (err) {
    console.error('Invalid address');
    return;
  }

}

exports.postPrice = async (priceObj) => {
  try {
    await knex('prices').insert({
      price: priceObj.price,
      stationid: priceObj.stationId,
      reporttime: priceObj.reportTime,
      octaneid: priceObj.octaneId,
    });
  } catch (err) {
    console.error('Error in inserting price data');
    console.error(err);
  }
}