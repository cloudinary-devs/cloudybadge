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
        :adjustment="adjustment"
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
        :colorize="colorize"
      />
      <exposure
        class="py-2"
        v-show="isSelected(options.exposure.type)"
        :exposure="exposure"
        :shadow-value="shadow"
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
        case this.options.contrast.type: {
          this.setContrast(this.initialEffects?.contrast?.value || "50");
          break;
        }
        case this.options.brightness.type: {
          this.setBrightness(this.initialEffects?.brightness?.value || "50");
          break;
        }
        case this.options.warmth.type: {
          this.setWarm(this.initialEffects?.warmth?.value || "50");
          break;
        }
        case this.options.exposure.type: {
          this.setExposure({
            effect: {
              effect: `fill_light:${
                this.initialEffects?.exposure?.value || "50"
              }`,
              type: this.options.exposure.type,
            },
          });
          this.setExposure({
            effect: {
              effect: `shadow:${this.initialEffects?.shadow?.value || "50"}`,
              type: "shadow",
            },
          });
          break;
        }
        case this.options.adjust.type: {
          this.setRotate({
            effect: {
              angle: this.initialEffects?.adjust.value || 0,
            },
            type: "adjust",
          });
          break;
        }
        case this.options.colorize.type: {
          this.setColorize({
            effect: {
              effect: `colorize:${
                this.initialEffects?.colorize?.value || "50"
              }`,
              color: this.initialEffects?.colorize?.color || "",
            },
            type: "colorize",
          });
          break;
        }
      }

      this.selectTab("");
    },
  },
};
</script>
