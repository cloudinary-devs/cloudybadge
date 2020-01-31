<template>
   <header class="header--container justify-between bg-grey-darkest text-white items-center p-2 py-3">
     <slot />
  </header>
</template>
<script>
</script>
<style scoped>
.header--container {
  display: grid;
  grid-template-columns: repeat(3, auto);
}
</style>