require("dotenv").config();
// Require axios to perform easy promise-based POST request
const axios = require("axios");
const { url, headers } = require("../setupGQL");
const updateAvatarMutation = require("../../schemas/mutations/updateAvatar");

const update = async (req, res) => {
  try {
    const data = req.body.payload;

    const query = `mutation {
      ${updateAvatarMutation(data)}
    }`;

    const response = await axios.post(url, { query }, { headers });

    const { updateAvatar: avatar } = response.data.data;

    return res.json({ avatar });
  } catch (error) {
    return res.json({
      error: error.message,
      statusCode: error.code || 403,
    });
  }
};

module.exports = update;
