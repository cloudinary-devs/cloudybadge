<template>
  <svg :width="size" :height="size" aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24">
    <path :fill="color" :d="path"/>
  </svg>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    path: {
      required: true,
      type: String
    }
  }
}
</script>