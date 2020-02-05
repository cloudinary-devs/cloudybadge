
require('dotenv').config();
const { q, client } = require('./setup');

module.exports = async (id, byKey) => {
  const indexQuery = `${process.env.FAUNA_QUERY_ONE_PREFIX}${byKey}`;

  try {
    return await client.query(
      q.Get(
        q.Match(
          q.Index(indexQuery), id
        )
      )
    );
  } catch (error) {
    return {
      error: error.message,
    }
  }
}
