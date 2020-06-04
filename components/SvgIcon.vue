<template>
  <div>
    <svg
      :viewBox="viewBox"
      :width="size"
      :height="size"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      preserveAspectRatio="xMidYMid"
    >
      <path :d="path" v-for="(path, index) in paths" :key="index" />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    viewBox: String,
    size: String,
    color: String,
    icon: [String, Array],
  },
  computed: {
    paths() {
      if (Array.isArray(this.icon)) {
        return this.icon;
      } else {
        return [this.icon];
      }
    },
  },
};
</script>
