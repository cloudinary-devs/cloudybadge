<template>
  <div>
    <div class="bg-cloudinary py-5 flex flex-col items-center">
      <div class="flex items-center justify-center">
        <cld-image
          cloudName="cloudinary"
          public-id="logo/for_black_bg/cloudinary_icon_for_black_bg"
          width="80"
          quality="auto"
          fetchFormat="auto"
          crop="scale"
        />
        <h1
          class="mx-3 font-display self-end text-cloudinary-light text-title leading-title"
        >
          {{ $t("title") }}
        </h1>
      </div>
      <h3
        class="text-grey-dark font-mono font-thin mt-3 have-fun bg-white px-4 text-center mx-4 text-cloudinary-black text-lg font-code"
      >
        {{ $t("landing.subTitle") }}
      </h3>
    </div>
    <div class="overflow-auto flex flex-col flex-1">
      <main class="mt-5 bg-grey flex-1">
        <div class="mx-8">
          <div class="text-2xl font-display text-center text-cloudinary">
            {{ $t("landing.activeEvents") }}
          </div>
          <list
            :items="activeConfs"
            grid
            class="flex my-5 p-0 flex-wrap justify-center"
          >
            <card slot-scope="item" v-bind="item" :link="`/event/${item.id}`" />
          </list>
        </div>
        <div class="mrt3 mx-8" v-if="pastConfs.length > 0">
          <div class="text-2xl font-display text-center text-cloudinary">
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
  </div>
</template>

<script>
import Card from "@/components/Card";
import List from "@/components/List.vue";

export default {
  components: { Card, List },
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

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
