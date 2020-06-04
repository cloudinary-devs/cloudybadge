<template>
  <div class="w-full flex input--slider items-center">
    <slot name="label">
      <span class="input--slider-label text-xs mr-12">{{ label }}</span>
    </slot>
    <div class="flex w-full flex-1 justify-start" :class="inputClass">
      <input
        class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-full max-w-md"
        v-debounce
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model="inputVal"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    min: {
      type: String,
      default: "0",
    },
    max: {
      type: String,
      default: "100",
    },
    step: {
      type: String,
      default: "1",
    },
    value: String,
    label: String,
    inputClass: String,
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
<style scoped>
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="range"]::-webkit-slider-thumb {
    width: 15px;
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    cursor: ew-resize;
    background: #fff;
    box-shadow: -405px 0 0 400px #6cb2eb;
    border-radius: 50%;
  }
}
.input--slider-label {
  width: 65px;
}
</style>
