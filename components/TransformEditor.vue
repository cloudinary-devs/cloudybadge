<template>
  <div class="flex-1 overflow-auto m-3">
    <div
      class="grid gap-3 row--settings"
      v-for="(value, key) in options"
      :key="key"
    >
      <div class="flex px-8 py-5 self-center">
        <svg-icon
          :icon="value.icon.path"
          :viewBox="value.icon.viewBox"
          size="24px"
          class="mr-2"
        />
        <span>
          {{ $t(`editBadge.customizer.${key}`) }}
        </span>
      </div>
      <adjustment @customize="setRotate" v-if="key === options.adjust.type" />
      <div
        class="flex flex-col self-center justify-center items-center px-8 py-5"
        v-if="key === options.brightness.type"
      >
        <input-slider
          :value="brightness"
          class="self-center"
          @input="setBrightness"
        />
      </div>
      <div
        class="flex flex-col self-center justify-center items-center px-8 py-5"
        v-if="key === options.contrast.type"
      >
        <input-slider
          :value="constrastValue"
          class="self-center"
          @input="setContrast"
        />
      </div>
      <exposure
        class="py-5"
        v-if="key === options.exposure.type"
        @customize="setExposure"
      />
      <div
        class="flex flex-col self-center justify-center items-center px-8 py-5"
        v-if="key === options.warmth.type"
      >
        <input-slider :value="warmth" class="self-center" @input="setWarm" />
      </div>
      <colorize @customize="setColorize" v-if="key === options.colorize.type" />
    </div>
    <div
      class="bg-colorize-yellow bg-colorize-orange bg-colorize-pink bg-colorize-red bg-colorize-purple bg-colorize-indigo bg-colorize-blue bg-colorize-green"
    />
  </div>
</template>
<script>
import customizer from "@/mixins/customizer";

export default {
  mixins: [customizer],
};
</script>
<style scoped>
.row--settings {
  grid-template-columns: 200px 1fr;
}
</style>
