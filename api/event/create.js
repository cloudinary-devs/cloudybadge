require("dotenv").config();
const axios = require("axios");
const { url, headers } = require("../setupGQL");
const createEventMutation = require("../../schemas/mutations/createEvent");

const create = async (req, res) => {
  try {
    const data = req.body.payload;
    data.duration = "";

    const query = `mutation {
      ${createEventMutation(data)}
    }`;

    const response = await axios.post(url, { query }, { headers });

    const { createConference: event } = response.data.data;

    return res.json({
      event,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      statusCode: error.code || 403,
    });
  }
};

module.exports = create;
