<template>
  <div class="admin-dashboard">
    <div class="flex w-full py-4 items-center">
      <div class="text-grey-darkest text-xl md:text-title mx-4">
        {{ $t("admin.dashboard.table") }}
      </div>
      <nuxt-link
        to="/admin/1/newEvent"
        class="no-underline rounded focus:outline-none flex items-center uppercase px-4 py-3 bg-cloudinary-orange hover:bg-orange-700 text-white"
      >
        <icon
          :icon="add_circle.path"
          :viewBox="add_circle.viewBox"
          size="20px"
        />
        <span class="ml-3 font-semibold">{{
          $t("admin.dashboard.actions.new")
        }}</span>
      </nuxt-link>
    </div>
    <div class="bg-cloudinary-light p-3 admin-dashboard--table overflow-hidden">
      <div class="border bg-cloudinary-darkest text-white events-table-row">
        <div class="py-2 px-3 border-r uppercase text-center">
          {{ $t("admin.dashboard.options.name") }}
        </div>
        <div class="py-2 px-3 border-r uppercase text-center">
          {{ $t("admin.dashboard.options.eventId") }}
        </div>
        <div class="py-2 px-3 border-r uppercase text-center">
          {{ $t("admin.dashboard.options.preset") }}
        </div>
        <div class="py-2 px-3 border-r uppercase text-center">
          {{ $t("admin.dashboard.options.active") }}
        </div>
        <div class="py-2 px-3 border-r uppercase text-center">
          {{ $t("admin.dashboard.options.logo") }}
        </div>
        <div class="py-2 px-3 border-r uppercase text-center">
          {{ $t("admin.dashboard.options.actions") }}
        </div>
      </div>
      <list
        :items="events"
        class="bg-white admin-dashboard--table--body overflow-auto"
      >
        <event-row slot-scope="item" :item="item" @delete_event="deleteEvent" />
      </list>
    </div>
  </div>
</template>
<script>
import Icon from "@/components/SvgIcon.vue";
import EventRow from "@/components/EventRow.vue";
import { add_circle } from "@/assets/icons";
import List from "@/components/List.vue";

export default {
  components: { Icon, List, EventRow },
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
      add_circle,
      events: [],
    };
  },
  methods: {
    deleteEvent(id) {
      this.events = this.events.filter((event) => event.id !== id);
    },
  },
};
</script>
<style scoped>
.admin-dashboard--table {
  height: calc(100% - 75px);
}

.admin-dashboard--table--body {
  max-height: calc(100% - 35px);
}

.events-table-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  justify-content: center;
}
</style>
