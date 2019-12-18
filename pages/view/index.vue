<template>
  <div class="m-5">
    <div class="my-5">
      <h2 class="text-center">Vote for the badge you ❤️</h2>
    </div>
    <div class="flex flex-wrap">
      <div v-for="(user, i) in users" :key="i" class="relative m-3">
        <nuxt-link :to="`/view/${user.id}`">
        <cld-image public-id="_cloudybadge/hackb4xmas/assets/badge-bg.png" width="200" crop="scale"
          class="border-2"
            :transformation="getTransformation(user)"
        >
        </cld-image>
        <button class="favorite absolute outline-none focus:outline-none" @click.stop="favoriteIt(user)">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#ef2e4f">
            <path
              :d="getFavoriteIcon(user)"/>
          </svg>
        </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: [{
        name: "Maya Shavin",
        company: 'Cloudinary',
        title: 'SRE',
        avatar: {
          public_id: "_cloudybadge/hackb4xmas/assets/blbhofoixmaaqju9hecw",
          transformation: {
            name: 'Hokusai',
            crop: 'fill',
            dpr: 'auto',
            effect: 'art:hokusai',
          }
        },
        id: 1,
      }, {
        name: "Maya Shavin",
        company: 'Cloudinary',
        title: 'SRE',
        avatar: {
          public_id: "_cloudybadge/hackb4xmas/assets/blbhofoixmaaqju9hecw",
          transformation: {
            name: 'Hokusai',
            crop: 'fill',
            dpr: 'auto',
            effect: 'art:hokusai',
          }
        },
        id: 2,
      }, {
        name: "Maya Shavin",
        company: 'Cloudinary',
        title: 'SRE',
        avatar: {
          public_id: "_cloudybadge/hackb4xmas/assets/blbhofoixmaaqju9hecw",
          transformation: {
            name: 'Hokusai',
            crop: 'fill',
            dpr: 'auto',
            effect: 'art:hokusai',
          }
        },
        id: 3
      }],
      favoriteBadge: ''
    };
  },
  methods: {
    getTransformation(user) {
      return [{
        overlay: user.avatar.public_id.replace(/\//gm, ':'),
        radius:"max",
        width:"800",
        height:"800",
        x:"6",
        y:"320",
        crop:"thumb",
        ...user.avatar.transformation,
      }, {
        overlay: `text:Roboto_80:${user.name}`,
        y: "-1000"
      }, {
        overlay: `text:Roboto_50:${user.company}`,
        y: "-900"
      }, {
        overlay: `text:Roboto_50:${user.title}`,
        y: "-800"
      }]
    },
    getFavoriteIcon(user) {
      if (this.favoriteBadge === user.id) {
        return 'M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z'
      }
      else {
        return "M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181";
      }
    },
    favoriteIt(user) {
      this.favoriteBadge = user.id;
    }
  },
}
</script>
<style scoped>
  .favorite {
    top: 0;
    right: 0;
    padding: 10px;
  }
</style>