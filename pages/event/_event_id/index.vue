<template>
  <div>
    <top-bar class="py-3 items-center">
      <back link="/" class="text-white mx-4" size="32px" />
      <div class="flex items-center justify-center mx-3">
        <cld-image :public-id="event.logo" width="50" crop="scale" />
        <h2 class="mx-3 font-display text-xl md:text-title text-center">
          {{ event.name }}
        </h2>
      </div>
    </top-bar>
    <h2
      class="text-lg md:text-2xl font-display text-center mt-5 md:mt-8 mb-4 px-2"
    >
      {{
        currentViewer ? $t("conference.vote") : $t("conference.registerAndVote")
      }}
    </h2>
    <div class="flex justify-center items-center font-display my-3 md:my-5">
      <nuxt-link :to="`/event/${event.id}/leaderboard?vid=${currentViewer}`">
        <div
          class="bg-cloudinary-green hover:bg-green-700 text-white font-semibold p-3 rounded mx-2 m-auto"
        >
          {{ $t("conference.viewBoard") }}
        </div>
      </nuxt-link>
      <nuxt-link
        :to="`/event/${event.id}/register`"
        v-if="event.active && !currentViewer"
      >
        <div
          class="bg-cloudinary-orange hover:bg-orange-700 text-white p-3 rounded mx-2 font-semibold"
        >
          {{ $t("conference.register") }}
        </div>
      </nuxt-link>
    </div>
    <list
      :items="badges"
      grid
      class="mx-8 my-4 overflow-auto p-3 justify-center flex-1 bg-cloudinary-light flex-wrap"
    >
      <div slot-scope="item" class="m-6 relative">
        <button
          class="absolute bg-white p-2 rounded-full settings"
          v-if="event.active && currentViewer && currentViewer === item.viewKey"
        >
          <svg-icon
            :view-box="settings.viewBox"
            size="26px"
            class="text-gray-500 hover:text-cloudinary"
            :icon="settings.path"
          />
        </button>
        <nuxt-link
          :to="`/event/${event.id}/badge/${item.viewKey}?vid=${currentViewer}`"
        >
          <thumbnail
            :id="item.viewKey"
            width="250"
            :avatar="item.avatar"
            class="ma-6 border-4 rounded-full border-white badge--thumbnail"
          />
          <div
            class="text-md text-cloudinary font-semibold text-center mt-3 font-display"
          >
            {{ item.firstName }}
          </div>
          <div
            class="text-md text-cloudinary font-semibold text-center font-display"
          >
            {{ item.lastName }}
          </div>
        </nuxt-link>
        <button
          class="absolute bg-white p-2 rounded-full favorite right-0"
          v-if="event.active && currentViewer && currentViewer !== item.viewKey"
          @click="toggleVote(item)"
        >
          <svg-icon
            :view-box="getFavoriteIcon(item.votes).viewBox"
            size="26px"
            class="hover:text-red-600"
            :class="getColor(item.votes)"
            :icon="getFavoriteIcon(item.votes).path"
          />
        </button>
      </div>
    </list>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar";
import List from "@/components/List";
import Thumbnail from "@/components/Thumbnail";
import Back from "@/components/BackBtn";
import { settings, heart, favorited } from "@/assets/icons";

//TODO: Add metadata
export default {
  components: { TopBar, List, Thumbnail, Back },
  head() {
    return {
      title: `${this.event.name}-${this.$t("title")}`,
    };
  },
  async asyncData({ params, query, $axios }) {
    const response = await $axios.$get(
      `api/getAllPerEvent?id=${params.event_id}`
    );
    let favoriteBadge = "";

    if (!response.error && query.vid) {
      const users = response.users;
      users.forEach((user) => {
        if (user.votes && user.votes.indexOf(query.vid) !== -1) {
          favoriteBadge = user.viewKey;
        }
      });
    }

    return !response.error
      ? {
          ...response,
          voteId: query.vid,
          favoriteBadge,
        }
      : {};
  },
  data() {
    return {
      users: [],
      event: null,
      favoriteBadge: "",
      voteId: "",
      settings,
    };
  },
  computed: {
    currentViewer() {
      return this.$route.query?.vid;
    },
    // currFavorite() {
    //   const { data } = this.$page.Fauna.Badges

    //   const favoriteBadge = this.currentViewer
    //     ? data.find((badge) => badge.votes?.includes(this.currentViewer))
    //     : null

    //   return favoriteBadge?._id
    // },
    badges() {
      // const { data: badges } = this.$page.Fauna.Badges
      return this.users.sort(function () {
        return 0.5 - Math.random();
      });
    },
  },
  methods: {
    toggleVote(item) {
      if (!item.votes) item.votes = [];
      const indexOfCurrentViewer = item.votes.indexOf(this.currentViewer);

      if (indexOfCurrentViewer === -1) {
        item.votes.push(this.currentViewer);
      } else {
        item.votes.splice(indexOfCurrentViewer, 1);
      }
    },
    getFavoriteIcon(votes) {
      if (votes?.includes(this.currentViewer)) {
        return favorited;
      } else {
        return heart;
      }
    },
    getColor(votes) {
      if (votes?.includes(this.currentViewer)) {
        return "text-red-600";
      } else {
        return "text-gray-600";
      }
    },
  },
};
</script>
<style scoped>
.user--icon {
  top: 0;
  right: 0;
  padding: 15px;
}

.event-container {
  display: grid;
  grid-template-rows: min-content min-content min-content auto;
  overflow: hidden;
  grid-gap: 1rem;
}
</style>
