require("dotenv").config();
const badgeByKeyQuery = require("../../schemas/query/badgeByKey");
const { post } = require("../setupGQL");

const byKey = async (req, res) => {
  const id = req.body.payload.id;

  const query = `{
    ${badgeByKeyQuery(id, "edit")}
  }`;

  try {
    const response = await post(query);

    const badge = response.data.data.badgeByEditKey;

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

module.exports = byKey;
