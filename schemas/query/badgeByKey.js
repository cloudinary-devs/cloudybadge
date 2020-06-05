//Need to capitalize type
const byViewkey = (key) => `
badgeByViewKey(viewKey: "${key}")
`;

const byEditkey = (key) => `
badgeByEditKey(editKey: "${key}")
`;

const queryHeaders = {
  edit: byEditkey,
  view: byViewkey,
};

const query = (key, type) => `
${queryHeaders[type](key)} {
  _id
  firstName
  lastName
  avatar {
    _id
    public_id
    transformation
  }
  email
  votes
  editKey
  event {
    badge
    id
    active
  }
  company
  title
}
`;

module.exports = query;
