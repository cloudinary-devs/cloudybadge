require("dotenv").config();
// Require axios to perform easy promise-based POST request
const axios = require("axios");
const { url, headers } = require("../setupGQL");
const conferenceByIdQuery = require("../../schemas/conferenceById");

const loadEvent = async (req, res) => {
  try {
    // The GraphQL query, a string
    const query = `{
      ${conferenceByIdQuery(req.query.id)}
    }`;

    const vid = req.body.payload.viewKey;

    const response = await axios.post(url, { query }, { headers });

    const { conferenceById: event } = response.data.data;

    const attendants =
      event.attendants && event.attendants.data ? event.attendants.data : [];

    return res.json({
      event: {
        ...event,
        attendants: attendants.map((attendant) => {
          const mapped = {
            ...attendant,
            isCurrVoter: vid === attendant.editKey,
            isFavorited: attendant.votes.includes(vid),
            totalVotes: attendant.votes.length,
          };

          delete mapped.editKey;

          return mapped;
        }),
      },
    });
  } catch (error) {
    return res.json({
      error: error.message,
      statusCode: error.code || 403,
    });
  }
};

module.exports = loadEvent;
