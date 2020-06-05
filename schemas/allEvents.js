const query = () => `
allConferences {
  data {
    _id
    id
    name
    logo
    active
    location
    badge
  }
}
`;

module.exports = query;
