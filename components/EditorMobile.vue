<template>
  <div class="flex flex-col">
    <div class="flex-1 flex flex-col">
      <div class="flex-1 overflow-y-auto text-center">
        <div class="m-auto mt-2">
          <ClientOnly>
            <upload
              class="mx-2 bg-cloudinary-orange text-white rounded py-2 px-8 text-sm hover:bg-orange-700 font-semibold"
              :config="uploadConfig"
            />
          </ClientOnly>
          <button
            class="mx-2 text-white rounded py-2 px-8 text-sm hover:bg-green-700 font-semibold"
            :class="saveClass"
            @click="saveBadge"
          >
            {{ saveBtnLabel }}
          </button>
        </div>
        <badge
          class="m-auto my-3 justify-center"
          :badgeUrl="badge.event.badge"
          :name="name"
          :company="badge.company"
          :title="badge.title"
          :avatarOverlay="avatarOverlay"
          :effect="chosenEffect"
          height="500"
        />
        <div class="text-right">
          <button
            class="rounded-full shadow-xs p-2 mr-3"
            :class="showEffectsBtnColor"
            @click="toggleShowEffects"
          >
            <svg-icon
              :icon="settings.path"
              :viewBox="settings.viewBox"
              size="20px"
              class="text-white"
            />
          </button>
        </div>
      </div>
      <div class="flex flex-col mt-3 relative">
        <div class="tranform--tabs bg-gray-100 flex-1 flex flex-col">
          <div class="grid grid-cols-2 items-center text-sm justify-center">
            <button
              class="px-5 py-3 border-r border-gray-400"
              :class="tabClass('preset')"
              @click="setTab('preset')"
            >
              {{ $t("editBadge.editSection.presetTab") }}
            </button>
            <button
              class="px-5 py-3 text-center"
              @click="setTab('customize')"
              :class="tabClass('customize')"
            >
              {{ $t("editBadge.editSection.customizeTab") }}
            </button>
          </div>
          <div class="bg-cloudinary-light flex-1">
            <div
              class="flex justify-between overflow-auto h-full items-center"
              v-show="selectedTab === 'preset' && hasAvatar"
              v-if="badge.avatar"
            >
              <preset
                class="m-3 flex-shrink-0"
                v-for="(effect, i) in presets"
                :key="i"
                :effect="effect"
                :avatar="badge.avatar"
                v-on:applyeffect="applyEffect"
                :selected="effect.name === selectedPreset.name"
              />
            </div>
            <div
              class="flex flex-wrap justify-between overflow-auto h-full"
              v-show="selectedTab === 'customize' && hasAvatar"
            >
              <transform-editor
                @customize="customizeEffect"
                :effects="customEffects"
              />
            </div>
          </div>
        </div>
        <div
          class="text-center h-full text-xs p-2 bg-white w-full user--preset-item--effect absolute bg-cloudinary-light effect-section"
          v-show="showEffects"
        >
          <h5 class="mb-3 text-cloudinary-orange">
            {{ $t("editBadge.editSection.effectStyle") }}
          </h5>
          <effects :effect="chosenEffect" class="overflow-y-auto h-full pb-8" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import editor from "@/mixins/editor";
import TransformEditor from "@/components/TransformEditorMobile";

export default {
  name: "EditorMobile",
  mixins: [editor],
  components: { TransformEditor },
  methods: {
    toggleShowEffects() {
      this.showEffects = !this.showEffects;
    },
  },
};
</script>
<style scoped>
.effect-section {
  min-height: 205px;
}
</style>
