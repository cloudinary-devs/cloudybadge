const voter = {
  methods: {
    vote(item) {
      if (this.currentVoter.voteFor !== item.viewKey) {
        this.currentVoter.voteFor = item.viewKey;
      } else {
        this.currentVoter.voteFor = "";
      }

      this.$axios.$post("/api/badge/update", {
        payload: this.currentVoter,
      });
    },
  },
};

export default voter;
