<template>
  <div class="overflow-hidden">
    <top-bar class="py-3 items-center">
      <back
        :link="{
          path: `/event/${event.id}/`,
          query: { vid: `${currentViewer}` },
        }"
        class="text-white mx-4 flex"
        size="32px"
      />
      <div class="flex items-center justify-center mx-3">
        <cld-image :public-id="event.logo" width="50" crop="scale" />
        <h2 class="mx-3 font-display text-xl md:text-title text-center">
          {{ event.name }}
        </h2>
      </div>
    </top-bar>
    <div class="overflow-y-auto board">
      <h2
        class="text-lg md:text-2xl font-display text-center my-3 md:my-5 md:mt-8 md:mb-6 px-2"
      >
        {{ $t("leaderboard.heading") }}
      </h2>
      <div
        class="lg:grid grid-cols-2 overflow-hidden items-start px-3 md:px-12 gap-10"
      >
        <list :items="winners" list class="flex flex-col mt-2 md:mt-3">
          <div
            slot-scope="item"
            class="flex font-display justify-between items-center text-white p-3"
            :class="getClassRow(item.id)"
          >
            <div class="flex items-center">
              <thumbnail
                :id="item.viewKey"
                width="40"
                :avatar="item.avatar"
                class="border-2 rounded-full border-white"
              />
              <span class="ml-4 pr-2 border-r mr-2">
                <span class="font-semibold">{{ item.id + 1 }}</span>
                - {{ item.firstName }} {{ item.lastName }}
              </span>
              <div class="font-semibold">
                <span>{{ item.votes }}</span>
                <span>/{{ users.length }}</span>
              </div>
            </div>
            <div class="mr-2">
              <button
                v-if="
                  event.active &&
                  event.currentVoter &&
                  event.currentVoter.viewKey !== item.viewKey
                "
                @click="toggleVote(item)"
              >
                <svg-icon
                  :icon="voteIcon(item).path"
                  :viewBox="voteIcon(item).viewBox"
                  class="hover:text-red-600"
                  :class="voteColor(item)"
                  size="24px"
                />
              </button>
              <cld-image
                public-id="_cloudybadge/resources/trophy"
                fetchFormat="auto"
                quality="auto"
                width="32"
                crop="scale"
                v-else-if="item.id === 0 && !event.active"
              />
            </div>
          </div>
        </list>
        <div class="font-display bg-cloudinary-light p-6 mt-3">
          <h4
            class="border-b border-gray-500 px-2 pb-1 mr-6 text-md font-semibold"
          >
            {{ $t("leaderboard.section.title") }}
          </h4>
          <list
            :items="users"
            list
            class="my-2 list--full overflow-y-auto text-cloudinary"
          >
            <div slot-scope="item" class="py-1">
              <span class="ml-4">
                {{ item.id + 1 }}. {{ item.firstName }}
                {{ item.lastName }}
              </span>
            </div>
          </list>
          <div
            class="bg-cloudinary-pink bg-cloudinary-pale bg-cloudinary-indigo bg-cloudinary-sunny bg-cloudinary-sea"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar";
import Thumbnail from "@/components/Thumbnail";
import Back from "@/components/BackBtn";
import List from "@/components/List";
import { heart, favorited } from "@/assets/icons";

export default {
  components: { TopBar, List, Thumbnail, Back },
  head() {
    return {
      title: `Leaderboard of ${this.event?.name}-${this.$t("title")}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Leaderboard of ${this.event?.name}-${this.$t("title")}`,
        },
      ],
    };
  },
  data() {
    return {
      event: null,
    };
  },
  async asyncData({ params, $axios, query }) {
    const response = await $axios.$post(
      `api/event/load?id=${params.event_id}`,
      {
        payload: {
          viewKey: query.vid,
          leaderboard: true,
        },
      }
    );

    return !response.error
      ? {
          ...response,
        }
      : {};
  },
  computed: {
    users() {
      return (
        this.event?.attendants?.sort(
          (badgeA, badgeB) => badgeB.votes - badgeA.votes
        ) || []
      );
    },
    winners() {
      return this.users.slice(0, 5) || [];
    },
    currentViewer() {
      return this.$route.query?.vid || "";
    },
  },
  methods: {
    getClassRow(id) {
      const marginBottom = id < this.winners.length - 1 ? "mb-5 md:mb-8" : "";
      const bgs = ["pale", "pink", "indigo", "sunny", "sea"];

      return `${marginBottom} bg-cloudinary-${bgs[id]}`;
    },
    voteIcon(item) {
      return this.event.currentVoter.voteFor === item.viewKey
        ? favorited
        : heart;
    },
    voteColor(item) {
      return this.event.currentVoter.voteFor === item.viewKey
        ? "text-red-600"
        : "text-white";
    },
    toggleVote(item) {
      const attendant = this.event.attendants.find((a) => a._id === item._id);
      const currFavorite = this.event.attendants.find(
        (a) => a.viewKey === this.event.currentVoter.voteFor
      );

      if (this.event.currentVoter.voteFor === item.viewKey) {
        // item.votes--;
        attendant.votes--;
        this.event.currentVoter.voteFor = "";
      } else {
        // item.votes++;
        attendant.votes++;
        if (currFavorite) {
          currFavorite.votes--;
        }

        this.event.currentVoter.voteFor = item.viewKey;
      }

      this.$axios.$post("/api/badge/vote", {
        payload: this.event.currentVoter,
      });
    },
  },
};
</script>
<style scoped>
.list--full {
  height: 380px;
}

.list--full::-webkit-scrollbar-track {
  background: transparent;
}

.board {
  height: calc(100% - 10px);
}
</style>
