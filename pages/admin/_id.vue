<template>
  <div class="font-display">
    <top-bar class="py-3 items-center px-3">
      <div class="flex items-center justify-center">
        <c-image
          public-id="https://res.cloudinary.com/cloudinary/image/upload/c_scale,w_45/v1/logo/for_black_bg/cloudinary_icon_for_black_bg.png"
          class="pr-3 mr-2 border-r border-grey-darker"
        />
        <div class="text-lg ml-3">
          {{ $t("admin.dashboard.heading") }}
        </div>
      </div>
      <div></div>
      <div class="flex items-center">
        <icon
          :icon="person.path"
          :viewBox="person.viewBox"
          size="24"
          class="mr-3 bg-white rounded-full text-gray-500"
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
import TopBar from "@/components/TopBar.vue";
import EventRow from "@/components/EventRow.vue";
import { person } from "@/assets/icons";
import List from "@/components/List.vue";

export default {
  components: { TopBar, Icon, List, EventRow },
  head() {
    return {
      title: this.$t("admin.dashboard.heading"),
    };
  },
  data() {
    return {
      person,
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
