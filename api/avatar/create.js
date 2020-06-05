require("dotenv").config();
// Require axios to perform easy promise-based POST request
const axios = require("axios");
const { url, headers } = require("../setupGQL");
const createAvatarMutation = require("../../schemas/mutations/createAvatar");

const create = async (req, res) => {
  try {
    const data = req.body.payload;

    const query = `mutation {
      ${createAvatarMutation(data)}
    }`;

    const response = await axios.post(url, { query }, { headers });

    const { createAvatar: avatar } = response.data.data;

    return res.json({
      avatar,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      statusCode: error.code || 403,
    });
  }
};

module.exports = create;
