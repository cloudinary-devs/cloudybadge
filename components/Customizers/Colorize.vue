<template>
  <div class="px-8 py-5">
    <div class="flex justify-between sm:justify-start items-center flex-wrap">
      <button
        class="rounded-full mr-3 mb-3"
        :class="getSelectedColorClass('')"
        @click="setSelectedColor('')"
      >
        <svg-icon
          :icon="block.path"
          :viewBox="block.viewBox"
          :size="noColorSize"
          class="text-gray-500"
        />
      </button>
      <button
        class="rounded-full mr-3 mb-3"
        v-for="(name, key) in colorizes"
        :key="key"
        :class="getSelectedColorClass(name)"
        @click="setSelectedColor(name)"
      >
        <div
          class="color--item rounded-full"
          :style="`--color-item-size: ${colorSize}`"
          :class="`bg-colorize-${key}`"
        />
      </button>
    </div>
    <input-slider
      :value="opacity"
      class="self-center my-3"
      :label="$t('editBadge.customizer.opacity')"
      v-show="selectedColor"
      @input="setColorOpacity"
    />
  </div>
</template>
<script>
import { isMobileOnly } from "mobile-device-detect";
import { block } from "@/assets/icons";
import colorizes from "@/assets/colorizes.json";
import InputSlider from "@/components/InputSlider";

export default {
  components: { InputSlider },
  props: {
    colorize: {
      type: Object,
      default: () => ({
        color: "",
        value: "50",
      }),
    },
  },
  data() {
    return {
      block,
      colorizes,
      colorSize: isMobileOnly ? "14px" : "32px",
      noColorSize: isMobileOnly ? "16px" : "38px",
    };
  },
  computed: {
    selectedColor() {
      return this.colorize.color || "";
    },
    opacity() {
      return this.colorize.value || "";
    },
  },
  methods: {
    getSelectedColorClass(color) {
      return this.selectedColor === color ? "border-2 border-cloudinary" : "";
    },
    setSelectedColor(color) {
      // this.selectedColor = color;

      const effect = color
        ? {
            effect: `colorize:${this.opacity}`,
            color,
          }
        : {};

      this.$emit("customize", { effect, type: "colorize" });
    },
    setColorOpacity(opacity) {
      // this.opacity = opacity;

      const effect = this.selectedColor
        ? {
            effect: `colorize:${opacity}`,
            color: this.selectedColor,
          }
        : {};

      this.$emit("customize", { effect, type: "colorize" });
    },
  },
};
</script>
<style scoped>
.color--item {
  width: var(--color-item-size);
  height: var(--color-item-size);
  margin: 1px;
}
</style>
