require('dotenv').config();
const { q, client } = require('./setup');

module.exports = async (req, res) => {
  const eventId = req.query.id;
  // const getEvent = require('./getEvent');

  try {
    const [eventResponse, queryResponse] = await Promise.all([client.query(
      q.Get(
        q.Match(
          q.Index(process.env.FAUNA_QUERY_EVENT), eventId
        )
      )
    ), client.query(
      q.Paginate(
        q.Match(
          q.Index(process.env.FAUNA_QUERY_ALL_PER_EVENT), eventId
        )
      )
    )]);

    const badges = queryResponse.data;
    const allBadgesQuery = badges.map(ref => q.Get(ref));

    const response = await client.query(allBadgesQuery);

    const users = response.map(badge => {
      delete badge.data.editKey; //remove Edit key
      return badge.data;
    });

    return res.json({
      users,
      event: eventResponse.data
    });

  } catch(error) {
    console.error(error);

    return res.json({
      error: error.message
    });
  }
  
};