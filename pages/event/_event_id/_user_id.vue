<template>
  <div class="user-container overflow-hidden bg-grey relative">
    <top-bar>
      <back :link="`/event/${eventId}`"/>
      <div class="uppercase">{{title}}</div>
      <button v-if="!isView && event && event.active" class="bg-transparent text-white hover:bg-grey-darker border border-white uppercase px-3 py-2" @click="saveBadge" :disabled="saveBtnLabel === 'Saving...'">{{saveBtnLabel}}</button>
    </top-bar>
    <div v-if="!user" class="bg-grey-dark mx-3 mb-3 flex items-center justify-center text-white text-3xl">
      <span>User doesn't exist!</span>
    </div>
    <div v-else class="w-full flex">
      <badge class="upload--result--wrapper flex mr-3"
        :badgeUrl="event.badge"
        :name="name"
        :company="user.company"
        :title="user.title"
        :avatarOverlay="avatarOverlay"
        :effect="selectedEffect"
      />
      <div class="flex flex-col bg-grey-darker text-white h-full overflow-hidden justify-center w-full" v-if="!isView && user">
        <div :class="`${hasAvatar ? `text-right`: 'text-center m-5'}`">
          <div class="text-white" v-if="!avatar">No avatar found yet! Let's start by uploading something, shall we?</div>
          <button id="upload_widget" :class="uploadBtnConfig.class" @click="upload">{{uploadBtnConfig.label}}</button>
          <div class="text-sm text-left mx-3 pb-3 border-white border-b" v-if="hasAvatar">Next, transform yourself with Cloudinary</div>
        </div>
        <div class="upload__transformation--wrapper flex flex-col flex-1 h-1" v-if="avatar">
          <div class="flex justify-center items-center">
            <button :class="`px-3 my-2 py-2 text-grey-light hover:text-white border-r focus:outline-none ${selectedTab=== 'preset' ? 'font-bold border-b': ''}`" @click="setTab('preset')">Presets</button>
            <button :class="`px-3 my-2 py-2 text-grey-light hover:text-white focus:outline-none ${selectedTab=== 'customize' ? 'font-bold border-b': ''}`" @click="setTab('customize')">Customize</button>
          </div>
          <div class="flex flex-wrap justify-between overflow-auto h-full" v-show="selectedTab === 'preset'">
            <preset v-for="(effect, i) in effects" :key="i" :effect="effect" :avatar="avatar" v-on:applyeffect="applyEffect"/>
          </div>
        </div>
      </div>
      <div class="bg-grey-darker text-white h-full flex-1 p-5 text-center" v-else>
        <div class="flex flex-col">
          <span class="pb-3 border-white border-b font-bold text-left">Transformation effects used: </span>
          <effect-details :effect="avatar.transformation" class="my-5 bg-grey p-3" v-if="avatar"/>
          <span class="text-sm font-mono my-5" v-else>There is no avatar setup for this badge yet!</span>
        </div>
        <button class="user--upload-btn uppercase px-5 py-3 text-white m-3 shadow" v-if="voteId && avatar && voteId !== user.voteId">❤️ this badge!</button>
      </div>
    </div>
    <div class="user--overlay w-full px-3 flex items-center justify-center pb-3 bg-grey-light flex-col absolute top-0 p-7 h-full" v-if="saved">
      <div class="flex items-center mt-5">
        <svg aria-hidden="true" focusable="false" data-icon="check" role="img" viewBox="0 0 512 512" width="18" height="18">
          <path fill="#468F5B" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
        </svg>
        <span class="text-lg ml-2">Your badge is saved!</span>        
      </div>
      <div class="flex">
        <button class="bg-orange-darker rounded-full p-5 flex items-center my-5 mx-2" @click="shareLink">
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path fill="#fff" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
          </svg>
        </button>
        <button class="bg-orange-light rounded-full p-5 flex items-center my-5 mx-2" @click="copyLink">
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path fill="#fff" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"/>
          </svg>
        </button>
      </div>
      <div class="uppercase text-lg">or</div>
        <div class="flex">
          <nuxt-link :to="`/event/${eventId}`"><button class="user--upload-btn uppercase px-5 py-3 text-white m-3 shadow">View & Vote</button></nuxt-link>
          <button class="uppercase border border-indigo-dark hover:bg-indigo-darker hover:text-white px-5 py-3 shadow text-indigo-dark m-3" @click="saved=false">Continue Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import effects from '@/static/effects';
import Back from '@/components/Back';
import TopBar from '@/components/Header.vue';
import Preset from '@/components/Preset.vue';
import Badge from '@/components/Badge.vue';
import EffectDetails from '@/components/EffectDetails.vue';

export default {
  components: {
    Back,
    TopBar,
    Preset,
    Badge,
    EffectDetails
  },
  head() {
    return {
      title: this.user ? this.title : 'CloudyBadge view'
    }
  },
  async asyncData({ params, query, $axios }) {
    const response = await $axios.$get(`/api/getUser?id=${params.user_id}&vid=${query.vid}`);
    const event = !response.info.error ? await $axios.$get(`api/getEvent?id=${params.event_id}`) : null;     

    return {
      voteId: response.hasVoter && event && event.active ? query.vid : '',
      user: !response.info.error ? response.info.data : null,
      event,
      eventId: params.event_id,
      id: params.user_id,
      avatar: !response.info.error ? response.info.data.avatar : null,
      ref: !response.info.error ? response.info.ref['@ref'].id : '',
    };
  },
  data() {
    return {
      user: null,
      voteId: '',
      effects: effects,
      selectedEffect: {},
      eventId: '',
      event: null,
      selectedTab: 'preset',
      id: '',
      avatar: null,
      ref: '',
      saved: false,
      saveBtnLabel: 'Save'
    };
  },
  computed: {
    name() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
    title() {
      return this.isView ? `Badge of ${this.name}` : 'Customize your badge';
    },    
    avatarOverlay() {
      return this.hasAvatar ? this.avatar.public_id.replace(/\//gm, ':') : "fetch:https://res.cloudinary.com/mayashavin/image/upload/v1576215298/avatar_person.svg"
    },
    hasAvatar() {
      return this.user && this.avatar;
    },
    uploadBtnConfig() {
      return {
        label: `${this.hasAvatar ? 'Change' : 'Upload'} your avatar`,
        class: `user--upload-btn uppercase px-5 py-3 text-white m-3 shadow `
      }
    },
    isView() {
      return this.user && this.user.viewKey === this.id;
    }
  },
  methods: {
    async saveBadge() {
      this.saveBtnLabel = "Saving..."
      const response = await this.$axios.$post(`/api/update?ref=${this.ref}`, {
        avatar: {
          public_id: this.avatar.public_id,
          transformation: this.selectedEffect,
        }
      });

      this.saveBtnLabel = "Save";
      if (!response.error) {
        this.saved = true;
      }
      else {
        this.$toast.error("Unable to save. Please try again.");
      }
    },
    upload() {
      this.uploadWidget && this.uploadWidget.open();
    },
    applyEffect(effect) {
      this.selectedEffect =  effect;
    },
    setTab(tab) {
      this.selectedTab = tab;
    },
    shareLink() {

    },
    copyLink() {

    }
  },
  mounted() {
    this.uploadWidget = cloudinary.createUploadWidget({
      cloudName: "cdemo", 
      uploadPreset: "hackb4xmas",
      folder: `_cloudybadge/${this.eventId}/assets`
      }, (error, result) => { 
        if (!error && result && result.event === "success") { 
          this.avatar = result.info;
        }
      }
    )
  }
}
</script>
<style scoped>
.user-container {
  display: grid;
  grid-template-rows: min-content auto;
  overflow: hidden;
  grid-gap: 1rem;
}

.upload--wrapper {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-gap: 1rem;
}

.container-transformation-effect {
  width: 200px;
  height: 200px;
}

.user--upload-btn {
  background: #009688;
}

.user--upload-btn:hover {
  background: #1a847a;
}

.user--preset-item {
  max-width: 220px;
}

.upload--result--wrapper {
  min-width: 250px;
}

.user--preset-item:hover .user--preset-item--effect {
  display: block;
}

.user--preset-container {
  height: calc(100% - 200px);
}

.user--overlay {
  opacity: 0.9;
}
</style>