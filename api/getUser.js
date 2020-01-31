require('dotenv').config();
const { q, client } = require('./setup');

const getUserByKey = async (id, byKey) => {
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


module.exports = async (req, res) => {
  const id = req.query.id;
  const voteId = req.query.vid;
  let isVoteIdValidate = false;
  let responseData = {};

  if (voteId) {
    const voterQuery = await getUserByKey(voteId, 'voteid');
    isVoteIdValidate = !!voterQuery;
  }

  responseData = await getUserByKey(id, 'viewkey');

  if (responseData.error) {
    isVoteIdValidate = false;    
    const editQuery = await getUserByKey(id, 'editkey');

    responseData = editQuery;
  }

  if (responseData.data && responseData.data.editKey) {
    delete responseData.data.editKey;
  }

  return res.json({
    info: responseData,
    hasVoter: isVoteIdValidate,
  })
};