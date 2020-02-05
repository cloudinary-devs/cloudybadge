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
    <div class="flex w-full border-b py-4 items-center">
      <div class="text-grey-darkest text-xl mx-4">Create New Event</div>
      
    </div>
  </div>
</template>
<script>
import TopBar from '@/components/Header.vue';
import { person, add_circle } from '@/static/icons';
import Icon from '@/components/Icon.vue';

export default {
  components: { TopBar, Icon },
  data() {
    return {
      person,
      add_circle,
    }
  },
  methods: {
    logOut() {}
  }
}
</script>