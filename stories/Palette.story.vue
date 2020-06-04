<template>
  <div
    class="flex items-center justify-center px-3 palette"
    :class="`bg-${color}`"
  >
    <span class="text-white">{{ color }}</span>
  </div>
</template>
<script>
export default {
  props: {
    color: String,
  },
};
</script>
<style scoped>
.palette {
  width: 150px;
  height: 150px;
}
</style>
