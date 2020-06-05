require("dotenv").config();
const axios = require("axios");
const badgeByKeyQuery = require("../../schemas/query/badgeByKey");
const { url, headers } = require("../setupGQL");

const byKey = async (req, res) => {
  const id = req.query.id;
  const type = req.query.type;
  const vid = req.query.vid;

  const query = `{
    ${badgeByKeyQuery(id, type)}
  }`;

  try {
    const response = await axios.post(url, { query }, { headers });

    const field = type === "edit" ? "badgeByEditKey" : "badgeByViewKey";
    const badge = response.data.data[field];

    if (vid) {
      badge.isCurrViewer = vid === badge.editKey;
    }

    if (type === "view") {
      delete badge.editKey;
    }

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
