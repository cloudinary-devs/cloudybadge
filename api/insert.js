require('dotenv').config();
const faunadb = require('faunadb');
const shortid = require('shortid');
// const axios = require('axios');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB
});

module.exports = async (req, res) => {
  const data = req.body.payload;
  const uniquePath = shortid.generate();
  data.id = uniquePath;
  const badge = {
    data: data
  };

  try {
    await client.query(
      q.Create(
        q.Collection('cbadge'),
        badge
      )
    );
    // TODO
    try {
      // invoke ZEIT build process programmatically
    } catch(error) { }

    return res.json({
      body: `Successful registration` // ADD MORE DATA IF NEEDED
    });
  } catch(error) {
    console.error(error);
    return res.json({
      body: {
        error
      }
    });
  }
  
};