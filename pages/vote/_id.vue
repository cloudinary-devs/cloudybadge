<template>
  <div class="m-5 flex justify-center flex-col">
    <div class="vote--wrapper mt-3">
      <div class="vote--result--wrapper border-2">
        <cld-image public-id="_cloudybadge/hackb4xmas/assets/badge-bg.png"
          :transformation="transformation"
        >
        </cld-image>
      </div>
      <div class="flex justify-center">
        <div class="vote--wrapper">
        </div>
      </div>
    </div>
    <button class="bg-green-dark hover:bg-green-darker text-white font-bold p-4 rounded mt-4 m-auto">❤️ this badge!</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      avatar: '',
      name: 'Nadav Ofir',
      title: 'Walker',
      company: 'The Galaxy',
    }
  },
  computed: {
    nameOverlay() {
      return `text:Roboto_80:${this.name}`
    },
    companyOverlay() {
      return `text:Roboto_50:${this.company}`
    },
    titleOverlay() {
      return `text:Roboto_50:${this.title}`
    },
    avatarOverlay() {
      return this.avatar ? this.avatar.public_id.replace(/\//gm, ':') : "fetch:https://res.cloudinary.com/mayashavin/image/upload/v1576215298/avatar_person.svg"
    },
    transformation() {
      return [{
        overlay: this.avatarOverlay,
        radius:"max",
        width:"800",
        height:"800",
        x:"6",
        y:"320",
        crop:"thumb"
      }, {
        overlay: this.nameOverlay,
        y: "-1000"
      }, {
        overlay: this.companyOverlay,
        y: "-900"
      }]
    }
  },
  methods: {
    upvote() {}
  },
}
</script>
<style scoped>
.vote--wrapper {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-gap: 0.2rem;
}
</style>