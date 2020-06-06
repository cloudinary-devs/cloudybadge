<template>
  <li
    class="flex card--container bg-cloudinary-light hover:shadow mr-3 mb-3 flex-1"
  >
    <nuxt-link
      :to="link"
      class="grid grid-rows-grid-card gap-2 p-4 outline-none no-underline text-green-darker items-center text-center w-full"
    >
      <cld-image
        :public-id="logo"
        width="50"
        crop="scale"
        height="50"
        class="justify-center flex"
      />
      <div class="font-semibold text-green-900">{{ name }}</div>
      <div class="text-gray-500 text-sm">{{ location }}</div>
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
      default: "",
    },
  },
};
</script>
<style scoped>
.card--container {
  width: 240px;
  height: 165px;
}

.cld-image > img {
  height: 50px;
}
</style>
