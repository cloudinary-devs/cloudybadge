require("dotenv").config();
// Require axios to perform easy promise-based POST request
const { post } = require("../setupGQL");
const updateBadgeMutation = require("../../schemas/mutations/updateBadge");

const update = async (req, res) => {
  try {
    const data = req.body.payload;

    const query = `mutation {
      ${updateBadgeMutation(data)}
    }`;

    const response = await post(query);

    const { updateBadge: badge } = response.data.data;

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

module.exports = update;
