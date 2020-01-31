<template>
  <li class="flex border-2 flex-grow-0 card--container border-grey-lighter bg-grey-lightest hover:shadow mr-3 mb-3">
    <nuxt-link :to="link" class="flex flex-col justify-between p-4 outline-none no-underline text-green-darker items-center flex-1">
      <cld-image :public-id="logo" width="50" crop="scale" height="50"/>
      <div class="font-bold">{{name}}</div>
      <div class="text-grey-dark text-sm mt-1">{{location}}</div>
    </nuxt-link>
  </li>
</template>
<script>
export default {
  props: {
    link: {
      type: String,
      require: true,
    },
    logo: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
.card--container {
  width: 200px;
  height: 150px;
}
</style>