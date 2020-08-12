<template>
  <header class="grid bg-primary-500 text-white header-container">
    <slot />
  </header>
</template>
<style scoped>
.header-container {
  grid-template-columns: auto 1fr auto;
}
</style>
