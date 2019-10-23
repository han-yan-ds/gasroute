const modelPost = require('../models/modelPost');
const moment = require('moment');
const {createSalt} = require('../../util/util');

exports.postStation = async (req, res) => {
  // remove
  let testBody = {
    stationName: 'Conoco',
    stationStreetAddress: '1690 Pearl St, Denver, CO 80203',
    stationZip: 80203,
    needMembership: 0,
  };
  // remove
  let response = await modelPost.postStation(testBody);
  res.json(response);
}

exports.postPrice = async (req, res) => {
  // remove
  let testPrice = {
    price: 2.69,
    stationId: 2,
    reportTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    octaneId: 1,
  };
  // remove
  let response = await modelPost.postPrice(testPrice);
  res.json(response);
}

exports.postReview = async (req, res) => {
  // remove
  let testReview = {
    stationId: 2,
    reviewerId: 1,
    reviewTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    reviewRating: 4,
    reviewDescription: "There's closer gas here",
  };
  // remove
  let response = await modelPost.postReview(testReview);
  res.json(response);
}

exports.postUser = async (req, res) => {
  // HASHING WILL OCCUR ON CLIENT SIDE
  // SALTING WILL OCCUR ON SERVER SIDE:
    // 1) generate salt on server
    // 2) send salt back to client
    // 3) client hashes pw + salt
    // 4) client sends hash to server
    // this way, pw is NEVER passed over network
  // remove
  let testUser = {
    username: 'badkitty',
    // pw + salt: password-,m$guFn>p<^]zFq|G-XOeC2El,g-KFtGI,(>;]~
    pwhash: 'FFEE9DBA991CDFCFA576093C34A1BA1FBE9E2809D3E2F65C90C22D08DCB89CE9',
    salt: '-,m$guFn>p<^]zFq|G-XOeC2El,g-KFtGI,(>;]~'
  };
  // remove
  let response = await modelPost.postUser(testUser);
  res.json(response);  
}