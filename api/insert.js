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

  data.voteID = uniquePath;
  data.eventCode = process.env.CLOUDYBADGE_EVENT
  data.editKey = shortid.generate();
  data.viewKey = shortid.generate();
  data.tranStr = '';

  const badge = {
    data: data
  };

  try {
    const response = await client.query(
      q.Create(
        q.Collection(process.env.FAUNA_COLLECTION),
        badge
      )
    );
    // TODO
    try {
      // invoke ZEIT build process programmatically
    } catch(error) { }

    return res.json(response.data)
  } catch(error) {
    console.error(error);
    return res.json({
      body: {
        error
      }
    });
  }
  
};