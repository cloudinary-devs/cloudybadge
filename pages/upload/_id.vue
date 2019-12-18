<template>
  <div class="m-5 flex justify-center flex-col">
    <div class="upload--wrapper mt-3">
      <div class="upload--result--wrapper border-2">
        <cld-image public-id="_cloudybadge/hackb4xmas/assets/badge-bg.png"
          :transformation="transformation"
        >
        </cld-image>
      </div>
      <div class="flex justify-center">
        <div>
          <button id="upload_widget" class="cloudinary-button" @click="upload">Upload your avatar</button>
        </div>
        <div class="upload__transformation--wrapper" v-if="avatar">
          
        </div>
      </div>
    </div>
    <button class="bg-green-dark hover:bg-green-darker text-white font-bold p-4 rounded mt-4 m-auto">Save your badge</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uploadWidget: null,
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
    upload() {
      this.uploadWidget && this.uploadWidget.open();
    }
  },
  mounted() {
    this.uploadWidget = cloudinary.createUploadWidget({
      cloudName: process.env.cloudName, 
      uploadPreset: process.env.uploadPreset,
      folder: process.env.uploadFolder
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
  grid-gap: 0.2rem;
}

.upload--result--wrapper {
  height: 100%;
}
</style>