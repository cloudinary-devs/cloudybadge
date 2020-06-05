const mutation = (id) => `
deleteConference(
  id: "${id}"
) {
  _id
}
`;

module.exports = mutation;
