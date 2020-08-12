<template>
  <div class="flex flex-col self-start justify-center items-center px-8">
    <input-slider
      :value="exposureValue"
      class="self-center my-2 md:my-3"
      :label="$t('editBadge.customizer.exposure')"
      @input="setExposure"
    />
    <input-slider
      :value="shadow"
      class="self-center my-2 md:my-3"
      :label="$t('editBadge.customizer.shadow')"
      @input="setShadow"
    />
  </div>
</template>
<script>
export default {
  props: {
    exposure: {
      type: Object,
      default: () => ({
        value: "50",
      }),
    },
    shadowValue: {
      type: Object,
      default: () => ({
        value: "50",
      }),
    },
  },
  computed: {
    exposureValue() {
      return this.exposure.value || "50";
    },
    shadow() {
      return this.shadowValue.value || "50";
    },
  },
  methods: {
    setExposure(fill_light) {
      this.$emit("customize", {
        effect: { effect: `fill_light:${fill_light}` },
        type: "exposure",
      });
    },
    setShadow(shadow) {
      this.$emit("customize", {
        effect: { effect: `shadow:${shadow}` },
        type: "shadow",
      });
    },
  },
};
</script>
