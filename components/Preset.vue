<template>
  <div
    class="m-3 mb-5 flex-shrink-0 user--preset-item pt-3"
    :class="showHint ? 'hover:bg-white' : ''"
    v-if="avatar"
  >
    <div @click="applyEffect" class="cursor-pointer" :class="presetClass">
      <c-image
        v-bind="effect"
        :public-id="`${avatar.public_id}.png`"
        :width="presetImageSize"
        :height="presetImageSize"
        quality="auto"
        radius="max"
        class="border-4 rounded-full border-white w-fit"
      >
        <c-transformation v-if="effect.extra" v-bind="extra" />
      </c-image>
    </div>
    <h4
      class="uppercase text-center m-2 text-sm text-cloudinary px-3"
      :class="chosenEffectClass"
    >
      {{ $t(`editBadge.effects.${effect.name}`) }}
    </h4>
    <div class="relative w-full" v-if="showHint">
      <div
        class="text-center text-xs p-2 bg-white pt-0 w-full hidden user--preset-item--effect absolute"
      >
        <h5 class="mb-3 text-cloudinary-orange">
          {{ $t("editBadge.editSection.effectStyle") }}
        </h5>
        <effects :effect="effect" />
      </div>
    </div>
  </div>
</template>
<script>
import { isMobileOnly } from "mobile-device-detect";

export default {
  props: {
    effect: {
      type: Object,
      require: true,
    },
    avatar: {
      type: Object,
      require: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showHint: !isMobileOnly,
      presetClass: isMobileOnly ? "mx-2" : "m-2 mt-0 px-3",
      presetImageSize: isMobileOnly ? "100" : "180",
    };
  },
  methods: {
    applyEffect() {
      this.$emit("applyeffect", this.effect);
    },
  },
  computed: {
    chosenEffectClass() {
      return this.selected ? "font-semibold" : "";
    },
  },
};
</script>
<style scoped>
.user--preset-item:hover .user--preset-item--effect {
  display: block;
}
</style>
