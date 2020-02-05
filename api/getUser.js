require('dotenv').config();
const getUserByKey = require('./getUserByKey');

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