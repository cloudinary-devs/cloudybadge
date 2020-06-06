const query = (id) => `
conferenceById(id: "${id}") {
  _id
  id
  name
  badge
  active
  logo
  location
  duration
  preset
  active
  attendants {
    data {
      _id
      lastName
      firstName
      viewKey
      editKey
      company
      title
      votes
      voteFor
      email
      avatar {
        public_id
        transformation
      }
    }
  }
}
`;

module.exports = query;
