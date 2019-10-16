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