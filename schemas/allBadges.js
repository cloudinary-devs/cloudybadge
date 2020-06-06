const query = () => `
  allBadges {
    data {
      lastName
      firstName
      viewKey
      editKey
      company
      title
      email
      eventId
      votes
      voteFor
      avatar {
        public_id
        transformation
      }
    }
  }
`;

module.exports = query;
