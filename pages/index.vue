<template>
  <div>
    <div class="bg-primary-500 py-5">
      <div class="flex items-center justify-center">
        <c-image
          cloudName="cloudinary"
          public-id="logo/for_black_bg/cloudinary_icon_for_black_bg"
          width="80"
          crop="scale"
        />
        <h1 class="mx-3 self-end text-white text-title leading-title">
          {{ $t("title") }}
        </h1>
      </div>
      <h3
        class="mt-3 bg-white px-4 text-center text-cloudinary-black text-lg font-code w-fit mx-auto"
      >
        {{ $t("landing.subTitle") }}
      </h3>
    </div>
    <main class="overflow-auto mt-5 bg-grey flex-1">
      <div class="mx-8">
        <div class="text-2xl text-center text-primary-700">
          {{ $t("landing.activeEvents") }}
        </div>
        <list
          :items="activeConfs"
          grid
          class="flex my-5 p-0 flex-wrap justify-center w-full md:w-auto"
        >
          <card
            slot-scope="item"
            v-bind="item"
            :link="`/event/${item.id}`"
            class="w-full"
          />
        </list>
      </div>
      <div class="mrt3 mx-8" v-if="pastConfs.length > 0">
        <div class="text-2xl text-center text-primary-700">
          {{ $t("landing.pastEvents") }}
        </div>
        <list
          :items="pastConfs"
          grid
          class="flex my-5 p-0 flex-wrap justify-center"
        >
          <card slot-scope="item" v-bind="item" :link="`/event/${item.id}`" />
        </list>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t("title"),
    };
  },
  async asyncData({ params, $axios }) {
    const response = await $axios.$get(`/api/allEvents`);
    return !response.error
      ? {
          events: response.events,
        }
      : {};
  },
  data() {
    return {
      events: [],
    };
  },
  computed: {
    activeConfs() {
      //TODO - should be filtered by event.duration and event.active?
      return this.events.filter((event) => event.active);
    },
    pastConfs() {
      return this.events.filter((event) => !event.active);
    },
  },
};
</script>
