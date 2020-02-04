require('dotenv').config();
const faunadb = require('faunadb');
// const axios = require('axios');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB
});

module.exports = async (req, res) => {
  const ref = req.query.ref;
  const data = req.body;
  const badge = {
    data: data
  };

  console.log(badge);

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
      const queryResponse = await client.query(
        q.Get(
          q.Match(
            q.Index(`${process.env.FAUNA_QUERY_ONE_PREFIX}viewkey`), id
          )
        )
      );

      //TODO - how to get ref key from here
      return res.json(queryResponse);
    } catch(error) {
      console.error(error);
      return res.json({
        body: {
          error
        }
      });
    }
  }

  
};