require('dotenv').config();
const { q, client } = require('./setup');
const shortid = require('shortid');
const sendEmail = require('./sendEmail');

module.exports = async (req, res) => {
  const data = req.body.payload;
  const uniquePath = shortid.generate();
  const eventName = data.eventName;

  data.voteID = uniquePath;
  data.editKey = shortid.generate();
  data.viewKey = shortid.generate();
  data.tranStr = '';

  delete data.eventName;

  const badge = {
    data: data
  };

  try {
    const response = await client.query(
      q.Create(
        q.Collection(process.env.FAUNA_COLLECTION),
        badge
      )
    );

    await sendEmail(response.data, eventName);
    return res.json(response.data);
  } catch(error) {
    console.log('error')
    return res.json({
      error: error.message
    });
  }
  
};