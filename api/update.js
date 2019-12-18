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
        q.Update(q.Ref(q.Collection('cbadge'), ref),
        badge,
      ));
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