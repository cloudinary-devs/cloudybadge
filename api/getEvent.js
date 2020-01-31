require('dotenv').config();
const { q, client } = require('./setup');

module.exports = async (req, res) => {
  const eventId = req.query.id;
  try {
    const queryResponse = await client.query(
      q.Get(
        q.Match(
          q.Index(process.env.FAUNA_QUERY_EVENT), eventId
        )
      )
    );

    return res.json(queryResponse.data);
  } catch(error) {
    return res.json({
      error: error.message
    });
  }
  
};