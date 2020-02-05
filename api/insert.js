require('dotenv').config();
const { q, client } = require('./setup');
const shortid = require('shortid');
const sendEmail = require('./sendEmail');
const normalizeBadges = require('./getAllPerEvent').normalizeBadges;
const getAllBadges = require('./getAllPerEvent').getAllBadges;

const insert = async (userData, eventName) => {
  const response = await client.query(
    q.Create(
      q.Collection(process.env.FAUNA_COLLECTION),
      userData
    )
  );

  console.log(response);

  await sendEmail(response.data, eventName);
  return response.data;
}

module.exports = async (req, res) => {
  const data = req.body.payload;
  const uniquePath = shortid.generate();
  const eventName = data.eventName;

  data.voteID = uniquePath;
  data.editKey = shortid.generate();
  data.viewKey = shortid.generate();
  data.tranStr = '';
  data.votes = [];

  delete data.eventName;

  const badge = {
    data: data
  };

  try {
    const badgesQuery = await getAllBadges(data.eventId);
    const badges = await normalizeBadges(badgesQuery.data);

    const found = badges.find(badge => badge.data.email === data.email);

    if (found) {
      return res.json({
        error: 'Email was registered before.'
      });
    }
    else {
      const insertQuery = await insert(badge, eventName);
      return res.json(insertQuery);
    }
  } catch (error) {
    return res.json({
      error: error.message
    });    
  }  
};
