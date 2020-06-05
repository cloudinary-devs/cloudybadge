require("dotenv").config();
// Require axios to perform easy promise-based POST request
const axios = require("axios");
const { url, headers } = require("./setupGQL");
const allBadgesQuery = require("../schemas/allBadges");

const allBadges = async (req, res) => {
  try {
    // The GraphQL query, a string
    const query = `{
      ${allBadgesQuery()}
    }`;

    const response = await axios.post(url, { query }, { headers });

    const badges = response.data.data.allBadges.data.map((badge) => ({
      ...badge,
      editKey: null,
    }));

    return res.json({
      badges,
    });
  } catch (error) {
    return res.json({
      events: [],
      error: error.message,
      statusCode: error.code || 403,
    });
  }
};

module.exports = allBadges;
