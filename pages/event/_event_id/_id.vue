<template>
  <div>
    <top-bar class="py-3">
      <back
        :link="{ path: `/event/${badge.event.id}`, query: { vid: voteId } }"
        class="text-white mx-4"
      />
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
          <span class="font-semibold">{{ voters }}</span>
        </span>
        |
        <span class="mx-3">
          {{ $t("viewBadge.totalVotes") }}
          <span class="font-semibold">{{ voters }}</span>
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
          <badge
            class="flex mr-3 justify-center self-center"
            :badgeUrl="badge.event.badge"
            :name="name"
            :company="badge.company"
            :title="badge.title"
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
import Badge from "@/components/Badge";
import Back from "@/components/BackBtn";
import { favorited, heart } from "@/assets/icons";

export default {
  components: { TopBar, Effects, Badge, Back },
  name: "BadgeView",
  head() {
    return {
      title: `${this.badge.firstName} ${this.badge.lastName} ${this.$t(
        "viewBadge.heading"
      )}`,
    };
  },
  async asyncData({ params, query, $axios }) {
    const response = await $axios.$post(`/api/badge/view`, {
      payload: {
        id: params.id,
        vid: query.vid,
      },
    });

    return {
      voteId: query.vid || "",
      badge: response.badge ? response.badge : {},
      voters: response.voters || 0,
      isFavorited: response.currentViewer?.voteFor === params.id || false,
      currentViewer: response.currentViewer,
    };
  },
  data() {
    return {
      badge: null,
      voteId: "",
      voters: [],
      isFavorited: false,
      currentViewer: null,
    };
  },
  computed: {
    name() {
      return `${this.badge.firstName} ${this.badge.lastName}`;
    },
    hasVoteIcon() {
      return (
        !!this.voteId && this.badge?.event?.active && !this.badge.isCurrViewer
      );
    },
    voteIcon() {
      if (this.hasVoteIcon) {
        return this.isFavorited ? favorited : heart;
      }

      return {};
    },
    effect() {
      const transformation = this.badge.avatar?.transformation
        ? JSON.parse(this.badge.avatar?.transformation.replace(/'/g, `"`))
        : {};

      const effect = {
        preset: transformation.selectedPreset,
        transformation: Object.keys(transformation.customEffects || {}).map(
          (key) => transformation.customEffects[key]
        ),
      };

      return effect;
    },
    avatarOverlay() {
      return (
        this.badge.avatar?.public_id.replace(/\//gm, ":") ||
        "fetch:https://res.cloudinary.com/mayashavin/image/upload/v1576215298/avatar_person.svg"
      );
    },
  },
  methods: {
    toggleVote() {
      this.isFavorited = !this.isFavorited;

      if (this.currentViewer.voteFor === this.badge.viewKey) {
        this.voters--;
        this.currentViewer.voteFor = "";
      } else {
        this.voters++;
        this.currentViewer.voteFor = this.badge.viewKey;
      }

      this.$axios.$post("/api/badge/vote", {
        payload: this.currentViewer,
      });
    },
  },
};
</script>
