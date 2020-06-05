const mutation = (data) => `updateAvatar(
  id: "${data._id}",
  data: {
    public_id: "${data.public_id}"
    transformation: "${data.transformation}"
    owner: {
      connect: "${data.badgeId}"
    }
  }
) {
  _id
  public_id
  transformation
}`;

module.exports = mutation;
