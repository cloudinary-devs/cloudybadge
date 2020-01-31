require('dotenv').config();
const { q, client } = require('./setup');

module.exports = async (req, res) => {
  try {
    const queryResponse = await client.query(
      q.Paginate(
        q.Match(
          q.Index(process.env.FAUNA_QUERY_EVENTS)
        )
      )
    );

    const data = queryResponse.data;
    const allEventsQuery = data.map(ref => q.Get(ref));

    const response = await client.query(allEventsQuery)
    const events = response.map(entry => entry.data);

    return res.json({
      events
    });
  } catch(error) {
    return res.json({
      error: error.message
    });
  }
  
};