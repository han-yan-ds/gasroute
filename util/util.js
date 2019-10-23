const hasher = require('create-hash')('sha256');
const randomString = require('crypto-random-string');
const EVERY_CHARACTER = '~`@#$%^&*()-_=+[]{}|\\;:"\'/?.><,1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

exports.createHash = (pw, salt = '') => {
  return hasher(pw + salt);
}

exports.createSalt = () => {
  return randomString({length: 40, characters: EVERY_CHARACTER});
}

exports.extractAddressPart = (components, part, getLong = true) => {
  // part has to be a string: street_number/route/locality/administrative_area_level_1/postal_code
  for (let addressPart of components) {
    if (addressPart.types.includes(part)) {
      return (getLong) ? addressPart.long_name : addressPart.short_name;
    }
  }
  return null;
}

exports.addressStringSpacesToPluses = (streetAddress, city, state, zip) => {
  return `${streetAddress} ${city || ''} ${state || ''} ${zip || ''}`.trim().replace(/ +(?= )/g,'').replace(/ /g, '+');
}

exports.handleRequestErrors = (err, message) => {
  console.error(message);
}