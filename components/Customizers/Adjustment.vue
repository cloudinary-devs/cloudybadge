<template>
  <div class="flex flex-col self-start justify-center px-8 py-5">
    <div class="flex mb-5">
      <button
        class="text-xs flex mr-3 hover:text-cloudinary"
        @click="setRotate(90)"
      >
        <svg-icon
          :icon="rotate_left.path"
          :viewBox="rotate_left.viewBox"
          size="18px"
          class="mr-2"
        />
        <span>{{ $t("editBadge.customizer.rotate_left") }}</span>
      </button>
      |
      <button
        class="text-xs flex mx-3 hover:text-cloudinary"
        @click="setRotate(-90)"
      >
        <svg-icon
          :icon="rotate_right.path"
          :viewBox="rotate_right.viewBox"
          size="18px"
          class="mr-2"
        />
        <span>{{ $t("editBadge.customizer.rotate_right") }}</span>
      </button>
    </div>
  </div>
</template>
<script>
import { rotate_right, rotate_left } from "@/assets/icons";

export default {
  props: {
    adjustment: {
      type: Object,
      default: () => ({
        value: 0,
      }),
    },
  },
  data() {
    return {
      rotate_right,
      rotate_left,
    };
  },
  methods: {
    setRotate(rotateAngle) {
      this.$emit("customize", {
        effect: {
          angle: rotateAngle + this.adjustment.value,
        },
        type: "adjust",
      });
    },
  },
};
</script>
