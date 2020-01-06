require('dotenv').config();
const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB
});

module.exports = async (req, res) => {
  try {
    const queryResponse = await client.query(
      q.Paginate(
        q.Match(
          q.Index(process.env.FAUNA_QUERY_ALL)
        )
      )
    );
    const badges = queryResponse.data;
    const allBadgesQuery = badges.map(ref => q.Get(ref));

    const response = await client.query(allBadgesQuery)
    return res.json(response);
  } catch(error) {
    console.error(error);
    return res.json({
      body: {
        error
      }
    });
  }
  
};