require('dotenv').config();
const { q, client } = require('./setup');
const getUserByKey = require('./getUserByKey');

module.exports = async (req, res) => {
  const ref = req.query.ref;
  const data = req.body.payload;
  const badge = {
    data: data
  };

  if (ref) {
    try {
      const response = await client.query(
          q.Update(q.Ref(q.Collection(process.env.FAUNA_COLLECTION), ref),
          badge,
        ));
      return res.json(response.data);
    } catch(error) {
      return res.json({
        error: error.message
      });
    }
  }
  else {
    const id = req.query.id;

    try {
      const queryResponse = await getUserByKey(id, 'viewkey');
      const response = await client.query(
        q.Update(queryResponse.ref,
        badge,
      ));
    return res.json(response.data);
    } catch(error) {
      return res.json({
        body: {
          error
        }
      });
    }
  }

  
};