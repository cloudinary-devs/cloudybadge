<template>
  <div>
    <top-bar>
      <div class="flex items-center justify-center">
        <cld-image
          public-id="https://res.cloudinary.com/cloudinary/image/upload/c_scale,w_45/v1/logo/for_black_bg/cloudinary_icon_for_black_bg.png"
          class="pr-2 mr-2 border-r border-grey-darker"
        />
        <div class="text-lg">
          CloudyBadge Admin
        </div>
      </div>
      <div></div>
      <div class="flex items-center">
        <icon
          :path="person"
          size="24"
          color="grey"
          class="mr-3 bg-white rounded-full"
        />
        <button
          @click="logOut"
          class="text-white uppercase p-3 hover:text-grey hover:font-bold focus:outline-none border-l border-grey-darker"
        >
          Log out
        </button>
      </div>
    </top-bar>
    <nuxt-child :key="$route.params.id" class="admin--main" />
    <v-dialog />
  </div>
</template>
<script>
import Icon from "@/components/SvgIcon.vue";
import TopBar from "@/components/Header.vue";
import EventRow from "@/components/EventRow.vue";
import { person, add_circle } from "@/assets/icons";
import List from "@/components/List.vue";

export default {
  components: { TopBar, Icon, List, EventRow },
  async asyncData({ params, $axios }) {
    const response = await $axios.$get(`/api/getAllEvents`);
    return !response.error
      ? {
          events: response.events,
        }
      : {};
  },
  data() {
    return {
      person,
      add_circle,
      events: [],
    };
  },
  methods: {
    logOut() {},
  },
};
</script>
<style scoped>
.admin--main {
  height: calc(100% - 75px);
}
</style>
