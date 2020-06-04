<template>
  <div>
    <top-bar class="py-3">
      <back :link="`/event/${user.eventId}`" class="text-white mx-4" />
      <div class="flex items-center justify-center mx-3">
        <h2 class="mx-3 font-display text-lg md:text-title text-center">
          {{ name }}{{ $t("viewBadge.heading") }}
        </h2>
      </div>
    </top-bar>
    <div class="flex flex-1 flex-col">
      <div class="flex items-center justify-center font-display py-5 px-3">
        <button class="mr-3" @click="toggleVote" v-if="hasVoteIcon">
          <svg-icon
            :icon="voteIcon.path"
            :viewBox="voteIcon.viewBox"
            size="24px"
            class="text-red-600"
          />
        </button>
        <span v-if="hasVoteIcon">|</span>
        <span class="mx-3">
          {{ $t("viewBadge.positionInVote") }}
          <span class="font-semibold">{{ user.votes.length }}</span>
        </span>
        |
        <span class="mx-3">
          {{ $t("viewBadge.totalVotes") }}
          <span class="font-semibold">{{ user.votes.length }}</span>
        </span>
      </div>
      <div
        class="bg-cloudinary-light flex-1 justify-center md:grid grid-cols-2 lg:px-20 gap-8 px-3 py-5 sm:py-8 sm:px-8 overflow-auto"
      >
        <div
          class="code--box bg-cloudinary-darker px-2 mx-5 md:mx-0 flex flex-col h-fit"
        >
          <span
            class="text-white px-3 py-4 border-b border-gray-400 w-100 font-display"
          >
            {{ $t("viewBadge.transformationEffect") }}
          </span>
          <effects :effect="effect" class="mt-5 mx-3 mb-8 font-hairline" />
        </div>
        <div class="badge mt-8 md:mt-0">
          <badge-comp
            class="flex mr-3 justify-center self-center"
            :badgeUrl="user.badgeTemplate"
            :name="name"
            :company="user.company"
            :title="user.title"
            :avatarOverlay="avatarOverlay"
            :effect="effect"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar";
import Effects from "@/components/Effects";
import BadgeComp from "@/components/Badge";
import Back from "@/components/BackBtn";
import { favorited, heart } from "@/assets/icons";

export default {
  components: { TopBar, Effects, BadgeComp, Back },
  head() {
    return {
      title: `${this.user.firstName} ${this.user.lastName} ${this.$t(
        "viewBadge.heading"
      )}`,
    };
  },
  async asyncData({ params, query, $axios }) {
    const response = await $axios.$get(
      `/api/getUser?id=${params.user_id}&vid=${query.vid}`
    );
    const event = !response.info.error
      ? await $axios.$get(`api/getEvent?id=${params.event_id}`)
      : null;

    return {
      voteId: response.hasVoter && event && event.active ? query.vid : "",
      user: !response.info.error ? response.info.data : null,
      event,
      eventId: params.event_id,
      id: params.user_id,
      avatar: !response.info.error ? response.info.data.avatar : null,
      ref: !response.info.error ? response.info.ref["@ref"].id : "",
    };
  },
  data() {
    return {
      user: null,
      voteId: "",
      effects: effects,
      selectedEffect: {},
      eventId: "",
      event: null,
      selectedTab: "preset",
      id: "",
      avatar: null,
      ref: "",
      saved: false,
      saveBtnLabel: "Save",
      currentViewer: this.$route.query?.vid,
    };
  },
  computed: {
    name() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
    hasVoteIcon() {
      return this.currentViewer && this.currentViewer !== this.user.viewKey;
    },
    voteIcon() {
      if (this.hasVoteIcon) {
        return this.user.votes.includes(this.currentViewer) ? favorited : heart;
      }

      return {};
    },
    effect() {
      return {
        preset: {
          name: "Hokusai",
          crop: "fill",
          dpr: "auto",
          effect: "art:hokusai",
        },
      };
    },
    avatarOverlay() {
      return (
        this.user.avatar?.public_id.replace(/\//gm, ":") ||
        "fetch:https://res.cloudinary.com/mayashavin/image/upload/v1576215298/avatar_person.svg"
      );
    },
  },
  methods: {
    toggleVote() {
      const index = this.user.votes.indexOf(this.currentViewer);

      index === -1
        ? this.user.votes.push(this.currentViewer)
        : this.user.votes.splice(index, 1);
    },
  },
};
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
