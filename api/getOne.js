require('dotenv').config();
const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB
});

module.exports = async (req, res) => {
  const id = req.query.id;
  try {
    const queryResponse = await client.query(
      q.Get(
        q.Match(
          q.Index('user_by_id'), id
        )
      )
    );
    return res.json(queryResponse);
  } catch(error) {
    console.error(error);
    return res.json({
      body: {
        error
      }
    });
  }
  
};