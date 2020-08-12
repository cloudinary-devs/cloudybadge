<template>
  <li class="flex md:w-64 bg-primary-200 hover:shadow mr-3 mb-3 flex-1 rounded">
    <nuxt-link
      :to="link"
      class="grid grid-rows-grid-card gap-2 p-4 outline-none no-underline text-secondary-600 items-center text-center w-full"
    >
      <c-image
        :alt="name"
        :public-id="logo"
        width="50"
        crop="scale"
        height="50"
        class="justify-center flex card--container-img mx-auto"
      />
      <div class="font-semibold text-secondary-600 truncate">{{ name }}</div>
      <div class="text-secondary-500 text-sm capitalize">{{ location }}</div>
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
