<template>
  <div class="m-5 flex justify-center flex-col">
    <div class="upload--wrapper mt-3">
      <div class="upload--result--wrapper flex">
        <cld-image public-id="_cloudybadge/hackb4xmas/assets/badge-bg.png"
          class="border-2 self-center"
          :transformation="transformation"
        >
        </cld-image>
      </div>
      <div class="flex flex-col">
        <div class="m-auto">
          <button id="upload_widget" class="cloudinary-button" @click="upload">Upload your avatar</button>
        </div>
        <div class="upload__transformation--wrapper" v-if="avatar">
          <h3 class="mt-3 mb-3">Transform yourself with:</h3>
          <div class="flex flex-wrap">
            <div v-for="(effect, i) in effects" :key="i" class="m-3 flex-no-shrink">
              <h4>{{effect.name}}</h4>
              <div  @click="applyEffect(effect)" class="container-transformation-effect cursor-pointer">
                <cld-image v-bind="effect" :public-id="avatar.public_id" width="1080" height="1080">
                  <cld-transformation v-if="effect.extra" v-bind="extra"/>
                </cld-image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="bg-green-dark hover:bg-green-darker text-white font-bold p-4 rounded mt-4 m-auto">Save your badge</button>
  </div>
</template>
<script>
const effects = [{
  name: 'Original',
  crop: 'fill',
}, {
  name: 'Hokusai',
  crop: 'fill',
  dpr: 'auto',
  effect: 'art:hokusai',
}, {
  name: "Poster",
  crop: 'fill',
  dpr: "auto",
  effect: 'vectorize:2:0.8',
}, {
  name: "Duetone",
  crop: 'fill',
  dpr: 'auto',
  effect: "tint:100:6736dd:0p:00ffe3:100p",
  quality: "auto",
  focus: "auto",
}, {
  name: "Improve",
  crop: 'fill',
  dpr: 'auto',
  effect: "improve"
}, {
  name: "Retro",
  crop: 'fill',
  dpr: 'auto',
  effect: "saturation:300"
}];

export default {
  async asyncData({ params, $axios }) {
    const response = await $axios.$get(`api/getOne?id=${params.id}`);
    return response;
  },
  // data() {
  //   return {
  //     uploadWidget: null,
  //     avatar: '',
  //     name: 'Nadav Ofir',
  //     title: 'Walker',
  //     company: 'The Galaxy',
  //     selectedEffect: {},
  //     effects: [{
  //       name: 'Original',
  //       crop: 'fill',
  //     }, {
  //       name: 'Hokusai',
  //       crop: 'fill',
  //       dpr: 'auto',
  //       effect: 'art:hokusai',
  //     }, {
  //       name: "Stamp",
  //       crop: 'fill',
  //       dpr: "auto",
  //       effect: 'red:50',
  //     }, {
  //       name: "Duetone",
  //       crop: 'fill',
  //       dpr: 'auto',
  //       effect: "tint:100:6736dd:0p:00ffe3:100p",
  //       quality: "auto",
  //       focus: "auto",
  //     }, {
  //       name: "Improve",
  //       crop: 'fill',
  //       dpr: 'auto',
  //       effect: "improve"
  //     }, {
  //       name: "Retro",
  //       crop: 'fill',
  //       dpr: 'auto',
  //       effect: "pixelate:40"
  //     }]
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
        ...this.selectedEffect,
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
    upload() {
      this.uploadWidget && this.uploadWidget.open();
    },
    applyEffect(effect) {
      this.selectedEffect =  effect;
    }
  },
  mounted() {
    this.uploadWidget = cloudinary.createUploadWidget({
      cloudName: "cdemo", 
      uploadPreset: "hackb4xmas",
      folder: "_cloudybadge/hackb4xmas/assets"
      }, (error, result) => { 
        if (!error && result && result.event === "success") { 
          console.log('Done! Here is the image info: ', result.info); 
          this.avatar = result.info;
        }
      }
    )
  }
}
</script>
<style scoped>
.upload--wrapper {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-gap: 1rem;
}

.upload--result--wrapper {
  height: 100%;
}

.container-transformation-effect {
  width: 200px;
  height: 200px;
}
</style>