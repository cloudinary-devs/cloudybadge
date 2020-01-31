<template>
  <div :class="containerClass">
    <div v-for="(value, key) in filterItems" :key="key" :class="itemClass">
      <slot v-bind="{ id: key, ...value }" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
      items: Array | Object,
      grid: {
        type: Boolean,
        required: false,
        default: false,
      }
  },
  computed: {
    containerClass() {
      return 'list--container'
    },
    itemClass() {
      return `list--item pa-2 d-flex ${this.grid ? 'grid' : ''}`
    },
    filterItems() {
      return this.items
    }
  }
}
</script>
<style scoped>
.list--container {
    display: flex;
    flex-wrap: wrap;
}
.list--item:not(.grid){
  width: 100%;
}
</style>