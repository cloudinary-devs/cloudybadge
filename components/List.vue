<template>
  <div :class="listClass">
    <div v-for="(value, key) in filterItems" :key="key" :class="itemClass">
      <slot v-bind="{ id: key, ...value }" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: [Array, Object],
      default: () => [],
    },
    grid: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    itemClass() {
      return `list--item pa-2 ${this.grid ? "grid--view" : ""}`;
    },
    filterItems() {
      return this.items;
    },
    listClass() {
      return this.grid ? "flex" : "flex flex-col";
    },
  },
};
</script>
<style scoped>
.list--item:not(.grid--view) {
  width: 100%;
}
</style>
