const mutation = (data) => `
createConference(
  data: {
    id: "${data.id}"
    name:  "${data.name}"
    logo: "${data.logo}"
    location: "${data.location}"
    active: ${data.active}
    badge: "${data.badge}"
    duration: "${data.duration}"
    preset: "${data.preset}"
  }
) {
  _id
  id
  name
  logo
  location
  active
  badge
  duration
  preset
  attendants {
    data {
      _id
    }
  }
}
`;

module.exports = mutation;
