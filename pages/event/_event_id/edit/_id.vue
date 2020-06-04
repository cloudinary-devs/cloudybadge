<template>
  <div class="font-display">
    <top-bar class="py-3 text-xl">
      <back
        :link="`/event/${badge.eventId}`"
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
import Back from "@/components/BackBtn";
import TopBar from "@/components/TopBar";
import editor from "@/mixins/editor";

export default {
  components: {
    Back,
    TopBar,
  },
  async asyncData({ params, query, $axios }) {
    const response = await $axios.$get(
      `/api/getUser?id=${params._id}&vid=${query.vid}`
    );
    const event = !response.info.error
      ? await $axios.$get(`api/getEvent?id=${params.event_id}`)
      : null;

    return {
      voteId: response.hasVoter && event && event.active ? query.vid : "",
      badge: !response.info.error ? response.info.data : null,
      event,
      eventId: params.event_id,
      id: params.user_id,
      avatar: !response.info.error ? response.info.data.avatar : null,
      ref: !response.info.error ? response.info.ref["@ref"].id : "",
    };
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
