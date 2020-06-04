<template>
  <div class="flex w-full">
    <div
      class="flex-1 overflow-auto mx-3 my-4 flex items-center justify-between"
      v-show="!selectedTab"
    >
      <button
        class="flex flex-col justify-between px-4 self-center items-center text-gray-700"
        v-for="(value, key) in options"
        :key="key"
        @click="selectTab(key)"
      >
        <svg-icon
          :icon="value.icon.path"
          :viewBox="value.icon.viewBox"
          size="50px"
          class="mt-2 order-2 text-gray-700"
        />
        <span class="order-1">
          {{ $t(`editBadge.customizer.${key}`) }}
        </span>
      </button>
      <div
        class="bg-colorize-yellow hidden bg-colorize-orange bg-colorize-pink bg-colorize-red bg-colorize-purple bg-colorize-indigo bg-colorize-blue bg-colorize-green"
      />
    </div>
    <div class="flex-1 w-full" v-show="selectedTab">
      <adjustment
        @customize="setRotate"
        v-show="isSelected(options.adjust.type)"
        class="items-center"
      />
      <div
        class="flex flex-col self-center justify-center items-center px-8 py-5"
        v-show="isSelected(options.brightness.type)"
      >
        <input-slider
          :value="brightness"
          class="self-center flex flex-col"
          inputClass="justify-center"
          @input="setBrightness"
        >
          <template v-slot:label>
            <span class="font-xs mb-2">Brightness</span>
          </template>
        </input-slider>
      </div>
      <div
        class="flex flex-col self-center justify-center items-center px-8 py-5"
        v-show="isSelected(options.contrast.type)"
      >
        <input-slider
          :value="constrastValue"
          class="self-center flex flex-col"
          inputClass="justify-center"
          @input="setContrast"
        >
          <template v-slot:label>
            <span class="font-xs mb-2">Contrast</span>
          </template>
        </input-slider>
      </div>
      <div
        class="flex flex-col self-center justify-center items-center px-8 py-5"
        v-show="isSelected(options.warmth.type)"
      >
        <input-slider
          :value="warmth"
          class="self-center flex flex-col"
          inputClass="justify-center"
          @input="setWarm"
        >
          <template v-slot:label>
            <span class="font-xs mb-2">Warmth</span>
          </template>
        </input-slider>
      </div>
      <colorize
        @customize="setColorize"
        v-show="isSelected(options.colorize.type)"
      />
      <exposure
        class="py-2"
        v-show="isSelected(options.exposure.type)"
        @customize="setExposure"
      />
      <div
        class="flex-1 justify-center grid grid-cols-2 bg-cloudinary-gray text-white"
      >
        <button @click="cancel" class="py-2 border-r border-white">
          {{ $t("editBadge.actions.cancel") }}
        </button>
        <button @click="selectTab('')" class="py-2">
          {{ $t("editBadge.actions.apply") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import customizer from "@/mixins/customizer";

export default {
  mixins: [customizer],
  data() {
    return {
      selectedTab: "",
    };
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
    isSelected(tab) {
      return this.selectedTab === tab;
    },
    cancel() {
      switch (this.selectedTab) {
        case [options.contrast.type]: {
          this.setContrast(50);
          break;
        }
        case [options.brightness.type]: {
          this.setBrightness(50);
          break;
        }
        case [options.warmth.type]: {
          this.setWarm(50);
          break;
        }
        case [options.exposure.type]: {
          //todo
          break;
        }
        case [options.adjust.type]: {
          this.setRotate({
            effect: {
              angle: 0,
            },
            type: "adjust",
          }); //TODO
          break;
        }
        case [options.colorize.type]: {
          //todo
          this.setColorize({
            color: "",
          });
          break;
        }
      }

      this.selectedTab("");
    },
  },
};
</script>
