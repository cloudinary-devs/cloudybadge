const query = (key) => `
votersOfBadge(voteFor: "${key}") {
  data {
    _id
  }
}
`;

module.exports = query;
