require('dotenv').config();
const { q, client } = require('./setup');
const getEvent = require('./getEvent').getEventById;

const getAllBadges = async (eventId) => await client.query(
  q.Paginate(
    q.Match(
      q.Index(process.env.FAUNA_QUERY_ALL_PER_EVENT), eventId
    )
  )
);

const normalizeBadges = async (data) => {
  const badges = data;
  const allBadgesQuery = badges.map(ref => q.Get(ref));
  const response = await client.query(allBadgesQuery);

  return response;
}

const allPerEventModule = module.exports = async (req, res) => {
  const eventId = req.query.id;

  try {
    const [eventResponse, queryResponse] = await Promise.all([getEvent(eventId), getAllBadges(eventId)]);
    const response = await normalizeBadges(queryResponse.data);

    const users = response.map(badge => {
      delete badge.data.editKey; //remove Edit key
      delete badge.data.email;
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

allPerEventModule.getAllBadges = getAllBadges;
allPerEventModule.normalizeBadges = normalizeBadges;
