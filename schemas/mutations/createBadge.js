const mutation = (data) => `
createBadge(
  data: {
    firstName: "${data.firstName}"
    lastName: "${data.lastName}"
    company: "${data.company}"
    title: "${data.title}"
    email: "${data.email}"
    event: {
      connect: "${data.eventId}"
    }
    editKey: "${data.editKey}"
    viewKey: "${data.viewKey}"
    votes: []
  }
) {
  editKey
}
`;

module.exports = mutation;
