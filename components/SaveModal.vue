<template>
  <div class="bg-cloudinary text-white text-sm font-display">
    <div class="flex items-center justify-center pt-8 px-5">
      <svg-icon
        :icon="done.path"
        :viewBox="done.viewBox"
        size="24px"
        class="text-cloudinary-green"
      />
      <span class="ml-2">{{ $t("editBadge.status.success") }}</span>
    </div>
    <div class="flex justify-center my-8">
      <div class="flex items-center flex-col m-5">
        <button
          class="bg-cloudinary-indigo-dark h-fit rounded-full p-4 flex items-center"
          @click="shareLink"
        >
          <svg-icon :icon="share.path" :viewBox="share.viewBox" size="18px" />
        </button>
        <span class="uppercase mt-3 text-xs">
          {{ $t("editBadge.actions.share") }}
        </span>
      </div>
      <div class="flex justify-center items-center flex-col m-5">
        <button
          class="bg-cloudinary-sea-light h-fit rounded-full p-4 flex items-center"
          @click="copyLink"
        >
          <svg-icon :icon="copy.path" :viewBox="copy.viewBox" size="18px" />
        </button>
        <span class="uppercase mt-3 text-xs">
          {{ $t("editBadge.actions.copy") }}
        </span>
      </div>
    </div>
    <div class="flex bg-white px-5 py-2 justify-center">
      <nuxt-link
        class="bg-cloudinary-green rounded hover:bg-green-700 capitalize text-xs py-2 px-5 text-white m-3 shadow"
        @click.native="close"
        :to="voteLink"
      >
        {{ $t("editBadge.actions.viewVote") }}
      </nuxt-link>
      <button
        class="bg-cloudinary-orange rounded hover:bg-orange-700 capitalize py-2 px-5 shadow text-xs m-3"
        @click="close"
      >
        {{ $t("editBadge.actions.edit") }}
      </button>
    </div>
  </div>
</template>
<script>
import { copy, share, done } from "@/assets/icons";

export default {
  props: {
    voteLink: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      copy,
      share,
      done,
    };
  },
  methods: {
    copyLink() {
      this.$copyText(this.voteLink)
        .then(() =>
          this.$toast.success(this.$t("editBadge.copy.status.success"))
        )
        .catch(() =>
          this.$toast.success(this.$t("editBadge.copy.status.error"))
        );
    },
    shareLink() {},
    close() {
      this.$emit("close");
    },
  },
};
</script>
