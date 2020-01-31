require('dotenv').config();
const faunadb = require('faunadb');
// const axios = require('axios');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB
});

module.exports = async (req, res) => {
    const ref = req.query.ref;
  const data = req.body;
  console.log(req.body);
  const badge = {
    data: data
  };

  console.log(badge);

  try {
    const response = await client.query(
        q.Update(q.Ref(q.Collection(process.env.FAUNA_COLLECTION), ref),
        badge,
      ));
    return res.json(response.data);
  } catch(error) {
    return res.json({
      error: error.message
    });
  }
  
};