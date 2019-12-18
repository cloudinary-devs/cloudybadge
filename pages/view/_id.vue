<template>
  <div class="m-5 flex justify-center flex-col">
    <div class="vote--wrapper mt-3">
      <div class="vote--result--wrapper border-2">
        <cld-image public-id="_cloudybadge/hackb4xmas/assets/badge-bg.png"
          :transformation="transformation"
        >
        </cld-image>
      </div>
      <div class="flex flex-col p-4">
        <div class="flex flex-col">
          <h3>Transformations used: </h3>
          <div v-for="(value, name) in effect" :key="name" class="my-3">
            <span class="font-bold capitalize">{{name}}: </span><span class="italic">{{value}}</span>
          </div>
        </div>
        <button class="bg-green-dark hover:bg-green-darker text-white font-bold p-4 rounded mt-4 m-auto">❤️ this badge!</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  async asyncData({ params, $axios }) {
    const response = await $axios.$get(`http://localhost:3000/api/getOne?id=${params.id}`);
    return response;
    /*
      returns:
      "name": "Tamas",
      "company": "Cloudinary",
      "title": "DevRel King",
      "email": "tamas@cloudinary.com",
      "id": "aRltl-vu"
    */
  },
  // data() {
  //   return {
  //     avatar: '',
  //     name: 'Nadav Ofir',
  //     title: 'Walker',
  //     company: 'The Galaxy',
  //     effect: {
  //       crop: 'fill',
  //       dpr: 'auto',
  //       effect: "pixelate:40"
  //     }
  //   }
  // },
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
        crop:"thumb",
        ...this.effect,
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
  grid-gap: 1rem;
}
</style>