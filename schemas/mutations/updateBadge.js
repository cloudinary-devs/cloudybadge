const mutation = (data) => `updateBadge(
  id: ${data._id},
  data: {
    firstName: "${data.firstName}"
    lastName: "${data.lastName}"
    company: "${data.company}"
    title: "${data.title}"
    voteFor: "${data.voteFor}"
  }
) {
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
  voteFor
  editKey
  event {
    badge
    id
    active
  }
  company
  title
}`;

module.exports = mutation;
