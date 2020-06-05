require("dotenv").config();
// Require axios to perform easy promise-based POST request
const axios = require("axios");
const { url, headers } = require("./setupGQL");
const allEventsQuery = require("../schemas/allEvents");

const getAllEvents = async (req, res) => {
  try {
    // The GraphQL query, a string
    const query = `{
      ${allEventsQuery()}
    }`;

    const response = await axios.post(url, { query }, { headers });

    return res.json({
      events: response.data.data.allConferences.data,
    });
  } catch (error) {
    return res.json({
      events: [],
      error: error.message,
      statusCode: error.code || 403,
    });
  }
};

module.exports = getAllEvents;
