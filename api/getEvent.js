require('dotenv').config();
const { q, client } = require('./setup');

const getEvent = async (eventId) => await client.query(
  q.Get(
    q.Match(
      q.Index(process.env.FAUNA_QUERY_EVENT), eventId
    )
  )
);

const getEventModules = module.exports = async (req, res) => {
  const eventId = req.query.id;
  try {
    const queryResponse = await getEvent(eventId);

    return res.json(queryResponse.data);
  } catch(error) {
    return res.json({
      error: error.message
    });
  }
};

getEventModules.getEventById = getEvent;

