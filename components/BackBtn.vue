<template>
  <nuxt-link :to="link">
    <div class="p-2">
      <svg-icon :icon="back.path" :viewBox="back.viewBox" :size="size" />
    </div>
  </nuxt-link>
</template>
<script>
import { back } from "@/assets/icons";

export default {
  props: {
    link: {
      type: String,
      require: true,
    },
    size: {
      type: String,
      default: "24px",
    },
  },
  data() {
    return {
      back,
    };
  },
};
</script>
