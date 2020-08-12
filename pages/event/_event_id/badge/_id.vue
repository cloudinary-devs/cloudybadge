<template>
  <div class="font-display">
    <top-bar class="py-3 text-xl">
      <back
        :link="`/event/${badge.event.id}`"
        class="text-white ml-2 md:mx-4 self-center"
      />
      <div class="flex items-center justify-center mx-2 md:mx-3">
        <h2 class="md:mx-3 font-display text-center">
          {{ $t("editBadge.heading") }}
        </h2>
      </div>
    </top-bar>
    <div class="flex-1 flex flex-col">
      <editor :badge="badge" class="flex-1" />
    </div>
  </div>
</template>
<script>
import editor from "@/mixins/editor";

export default {
  name: "EditView",
  head() {
    return {
      title: `${this.badge.firstName} ${this.badge.lastName} - ${this.$t(
        "editBadge.heading"
      )}`,
    };
  },
  async asyncData({ params, query, $axios }) {
    const response = await $axios.$post(`/api/badge/edit`, {
      payload: {
        id: params.id,
      },
    });

    if (response.badge) {
      console.log(response);
      return {
        badge: response.badge,
      };
    } else {
      return {
        error: response.error,
        badge: {},
      };
    }
  },
  data() {
    return {
      badge: null,
    };
  },
};
</script>
<style scoped>
.effect-section {
  height: 205px;
}
</style>
