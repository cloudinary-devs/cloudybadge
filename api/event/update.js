require("dotenv").config();
const axios = require("axios");
const { url, headers } = require("../setupGQL");
const updateEventMutation = require("../../schemas/mutations/updateEvent");

module.exports = async (req, res) => {
  const data = req.body.payload;

  const query = `mutation {
    ${updateEventMutation(data)}
  }`;

  try {
    const response = await axios.post(url, { query }, { headers });

    console.log(response.data);
    const { updateConference: event } = response.data.data;

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
