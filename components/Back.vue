<template>
  <nuxt-link :to="link">
    <button class="outline-none rounded-full hover:bg-grey-darker border-0 p-2">
      <svg width="20" height="20" aria-hidden="true" focusable="false" data-icon="chevron-left" role="img" viewBox="0 0 320 512">
        <path fill="#fff" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/>
      </svg>
    </button>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    link: {
      type: String,
      require: true,
    }
  }
}
</script>