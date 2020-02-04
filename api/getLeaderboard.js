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

    const leaderboard = response.map(badge => {
      const data = badge.data;

      return {
        votes: data.votes ? data.votes.length : 0,
        name: `${data.firstName} ${data.lastName}`,
        firstName: data.firstName,
        lastName: data.lastName,
        viewKey: data.viewKey,
        avatar: data.avatar,
        company: data.company,
        title: data.title
      };
    });

    return res.json({
      leaderboard,
      event: {
        name: eventResponse.data.name,
        id: eventResponse.data.id,
        badge: eventResponse.data.badge,
        logo: eventResponse.data.logo
      }
    });

  } catch(error) {
    console.error(error);

    return res.json({
      error: error.message
    });
  }
};