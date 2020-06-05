require("dotenv").config();
// Require axios to perform easy promise-based POST request
const shortid = require("shortid");
const axios = require("axios");
const { url, headers } = require("../setupGQL");
const createBadgeMutation = require("../../schemas/mutations/createBadge");
const sendEmail = require("../sendEmail");

const create = async (req, res) => {
  try {
    const data = req.body.payload;
    const eventName = data.eventName;

    data.editKey = shortid.generate();
    data.viewKey = shortid.generate();

    const query = `mutation {
      ${createBadgeMutation(data)}
    }`;

    const response = await axios.post(url, { query }, { headers });

    const { createBadge: badge } = response.data.data;

    await sendEmail(data, eventName);

    return res.json({
      badge,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      statusCode: error.code || 403,
    });
  }
};

module.exports = create;
