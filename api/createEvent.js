require('dotenv').config();

const { q, client } = require('./setup');

module.exports = async (req, res) => {
  const data = req.body.payload;
  data.duration = {};

  const event = {
    data: data
  };

    console.log(data);
  try {
    const response = await client.query(
      q.Create(
        q.Collection(process.env.FAUNA_COLLECTION_CONFERENCE),
        event
      )
    );

    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    return res.json({
      error: error.message
    });    
  }  
};
