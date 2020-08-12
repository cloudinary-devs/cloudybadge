<template>
  <img v-bind="$attrs" :src="url" />
</template>
<script>
export default {
  props: {
    publicId: {
      type: String,
      required: true,
    },
  },
  computed: {
    url() {
      const options = {
        ...this.$attrs,
        quality: "auto",
        fetchFormat: "auto",
      };

      if (this.$attrs.cloudName) {
        options.cloud_name = this.$attrs.cloudName;
      }

      const url = this.$cloudinary().url(this.publicId, options);

      return url;
    },
  },
};
</script>
