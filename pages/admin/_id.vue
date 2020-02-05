<template>
  <div>
    <top-bar>
      <div class="flex items-center justify-center">
        <cld-image public-id="https://res.cloudinary.com/cloudinary/image/upload/c_scale,w_45/v1/logo/for_black_bg/cloudinary_icon_for_black_bg.png" class="pr-2 mr-2 border-r border-grey-darker"/>
        <div class="text-lg">
          CloudyBadge Admin
        </div>
      </div>
      <div></div>
      <div class="flex items-center">
        <icon :path="person" size="24" color="grey" class="mr-3 bg-white rounded-full"/>
        <button @click="logOut" class="text-white uppercase p-3 hover:text-grey hover:font-bold focus:outline-none border-l border-grey-darker">Log out</button>
      </div>
    </top-bar>
    <div class="admin-dashboard">
      <div class="flex w-full border-b py-4 items-center">
        <div class="text-grey-darkest text-xl mx-4">Your conference list</div>
        <nuxt-link to="/admin/newEvent" class="no-underline focus:outline-none">
          <button class="flex items-center uppercase px-4 py-3 hover:bg-grey-light">
            <icon :path="add_circle" size="20" color="#613b1f"/>
            <span class="ml-3">New Event</span>
          </button>
        </nuxt-link>
      </div>
      <div class="bg-grey-light p-3 admin-dashboard--table overflow-hidden">
        <div class="border bg-grey-darker text-white events-table-row">
          <div class="py-2 px-3 border-r uppercase text-center">Name</div>
          <div class="py-2 px-3 border-r uppercase text-center">Event ID</div>
          <div class="py-2 px-3 border-r uppercase text-center">Upload Preset</div>
          <div class="py-2 px-3 border-r uppercase text-center">Active</div>
          <div class="py-2 px-3 border-r uppercase text-center">Logo</div>
          <div class="py-2 px-3 border-r uppercase text-center">Action</div>
        </div>
        <list :items="events" class="bg-white admin-dashboard--table--body overflow-auto">
          <event-row slot-scope="item" :item="item"/>
        </list>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from '@/components/Icon.vue';
import TopBar from '@/components/Header.vue';
import EventRow from '@/components/EventRow.vue';
import { person, add_circle } from '@/static/icons';
import List from '@/components/List.vue';

export default {
  components: { TopBar, Icon, List, EventRow },
  async asyncData({ params, $axios }) {
    const response = await $axios.$get(`/api/getAllEvents`);
    return !response.error ? {
      events: response.events
    } : {}
  },
  data() {
    return {
      person,
      add_circle,
      events: []
    }
  },
  methods: {
    logOut() {}
  }
}
</script>
<style scoped>
.admin-dashboard {
  height: calc(100% - 80px);
}

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