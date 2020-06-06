require("dotenv").config();
const axios = require("axios");
const { url, headers } = require("../setupGQL");
const conferenceByIdQuery = require("../../schemas/conferenceById");

const loadEvent = async (req, res) => {
  try {
    // The GraphQL query, a string
    const query = `{
      ${conferenceByIdQuery(req.query.id)}
    }`;

    const vid =
      req.body.payload && req.body.payload.viewKey
        ? req.body.payload.viewKey
        : "";

    const loadVoters = req.body.payload && req.body.payload.leaderboard;

    const response = await axios.post(url, { query }, { headers });

    const { conferenceById: event } = response.data.data;

    const attendants =
      event.attendants && event.attendants.data ? event.attendants.data : [];

    const currentVoter = attendants.find(
      (attendant) => attendant.editKey === vid
    );

    const statistics = loadVoters
      ? attendants.reduce((board, attendant) => {
          if (board[attendant.viewKey] === undefined) {
            board[attendant.viewKey] = 0;
          }

          if (attendant.voteFor) {
            if (board[attendant.voteFor]) {
              board[attendant.voteFor]++;
            } else {
              board[attendant.voteFor] = 1;
            }
          }

          return board;
        }, {})
      : {};

    return res.json({
      event: {
        ...event,
        attendants: attendants.map((attendant) => {
          const mapped = {
            ...attendant,
          };

          delete mapped.editKey;

          if (loadVoters) {
            mapped.votes = statistics[mapped.viewKey];
          }

          return mapped;
        }),
        currentVoter,
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
