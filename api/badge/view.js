require("dotenv").config();
const badgeByKeyQuery = require("../../schemas/query/badgeByKey");
const voterInfoQuery = require("../../schemas/query/voterInfo");
const { post } = require("../setupGQL");

const byKey = async (req, res) => {
  const id = req.body.payload.id;
  const vid = req.body.payload.vid;

  const query = `{
    ${badgeByKeyQuery(id, "view")}
    ${voterInfoQuery(id)}
    ${
      vid
        ? `badgeByEditKey(editKey: "${vid}") {
      _id
      voteFor
    }`
        : ""
    }
  }`;
  console.log(query);
  try {
    const response = await post(query);

    const badge = response.data.data.badgeByViewKey;

    const voters = response.data.data.votersOfBadge
      ? response.data.data.votersOfBadge.data
      : [];

    const currentViewer = vid ? response.data.data.badgeByEditKey : null;

    if (vid) {
      badge.isCurrViewer = vid === badge.editKey;
    }

    delete badge.editKey;

    console.log(voters);

    return res.json({
      badge,
      voters: voters.length,
      currentViewer,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      statusCode: error.code || 403,
    });
  }
};

module.exports = byKey;
