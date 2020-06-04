<template>
  <button id="upload_widget" @click="upload">
    {{ $t("editBadge.actions.upload") }}
  </button>
</template>
<script>
export default {
  name: "Upload",
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      uploadWidget: null,
    };
  },
  methods: {
    upload() {
      this.uploadWidget && this.uploadWidget.open();
    },
  },
  mounted() {
    this.uploadWidget = window.cloudinary?.createUploadWidget(
      this.config,
      (error, result) => {
        if (!error && result && result.event === "success") {
          this.avatar = result.info;
        }
      }
    );
  },
};
</script>
