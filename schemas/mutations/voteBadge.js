const mutation = (data) => `updateBadge(
  id: ${data._id},
  data: {    
    voteFor: "${data.voteFor}"
  }
) {
    _id  
  voteFor
  editKey
}
`;

module.exports = mutation;
