require("dotenv").config();
const axios = require("axios");
const { url, headers } = require("../setupGQL");
const deleteEventMutation = require("../../schemas/mutations/deleteEvent");

module.exports = async (req, res) => {
  const id = req.query.id;

  const query = `mutation {
    ${deleteEventMutation(id)}
  }`;

  try {
    const response = await axios.post(url, { query }, { headers });

    const { deleteConference: event } = response.data.data;

    return res.json({
      event,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      status: "NOK",
    });
  }
};
