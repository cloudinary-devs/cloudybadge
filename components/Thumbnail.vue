<template>
  <div>
    <nuxt-link :to="`/event/${id}`" v-if="!readOnly">
      <cld-image :public-id="`${publicId}.png`"
        :transformation="transformation"
          width="150" crop="scale"
      />
      <div class="absolute user--icon">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#ef2e4f" v-if="hasWinnerIcon"  viewBox="0 0 576 512">
        <path
          d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
      </svg>
      <button class="user--icon absolute outline-none focus:outline-none" @click.prevent="favoriteIt" v-if="hasFavoriteIcon">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#ef2e4f">
          <path
            :d="favoriteIcon"/>
        </svg>
      </button>
      </div>
    </nuxt-link>
    <cld-image :public-id="`${publicId}.png`"
      :transformation="transformation"
      width="150" crop="scale"
      v-else
    />
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      require: true,
    },
    avatar: {
      type: Object,
    },
    hasWinnerIcon: {
      type: Boolean,
      default: false
    },
    hasFavoriteIcon: {
      type: Boolean,
      default: false,
    },
    isFavorited: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    publicId() {
      return this.avatar && this.avatar.public_id ? this.avatar.public_id : "https://res.cloudinary.com/mayashavin/image/upload/v1576215298/avatar_person.svg"
    },
    transformation() {
      return this.avatar && this.avatar.public_id  ? [{
        radius:"max",
        width:"150",
        height:"150",
        x:"6",
        y:"320",
        crop:"thumb",
        ...(this.avatar ? this.avatar.transformation : {}),
      }] : [];
    },
    favoriteIcon() {
      if (this.isFavorited) {
        return 'M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z'
      }
      else {
        return "M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181";
      }
    },
  },
  methods: {
    favoriteIt() {
      this.$emit('favorite', {
        index: this.index,
        upvote: !this.isFavorited
      });
    }
  }
}
</script>
<style scoped>
.user--icon {
    top: 0;
    right: 0;
    padding: 15px;
  }
</style>