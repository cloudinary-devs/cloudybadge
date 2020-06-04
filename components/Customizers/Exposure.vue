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
import InputSlider from "@/components/InputSlider";

export default {
  components: { InputSlider },
  data() {
    return {
      exposureValue: "50",
      shadow: "50",
    };
  },
  methods: {
    setExposure(fill_light) {
      this.exposureValue = fill_light;
      this.$emit("customize", {
        effect: { effect: `fill_light:${fill_light}` },
        type: "exposure",
      });
    },
    setShadow(shadow) {
      this.shadow = shadow;
      this.$emit("customize", {
        effect: { effect: `shadow:${shadow}` },
        type: "shadow",
      });
    },
  },
};
</script>
