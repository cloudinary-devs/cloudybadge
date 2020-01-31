require('dotenv').config();
const { q, client } = require('./setup');
const shortid = require('shortid');

module.exports = async (req, res) => {
  const data = req.body.payload;
  const uniquePath = shortid.generate();

  data.voteID = uniquePath;
  data.editKey = shortid.generate();
  data.viewKey = shortid.generate();
  data.tranStr = '';

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
    // TODO
    try {
      // invoke ZEIT build process programmatically
    } catch(error) { }

    return res.json(response.data)
  } catch(error) {
    console.error(error);
    return res.json({
      body: {
        error
      }
    });
  }
  
};