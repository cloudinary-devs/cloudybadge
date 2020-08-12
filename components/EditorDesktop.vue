<template>
  <div class="grid grid-cols-1-3 mt-5 mb-3 mx-5">
    <div>
      <span class="py-4 block">{{ $t("editBadge.badge") }}</span>
      <badge
        class="flex mr-3 justify-center"
        :badgeUrl="badge.event.badge"
        :name="name"
        :company="badge.company"
        :title="badge.title"
        :avatarOverlay="avatarOverlay"
        :effect="chosenEffect"
        height="500"
      />
      <button
        class="text-white rounded py-2 px-8 my-3 text-xs hover:bg-green-700"
        :class="saveClass"
        @click="saveBadge"
      >
        {{ saveBtnLabel }}
      </button>
    </div>
    <div class="flex flex-col">
      <div>
        <span class="block">
          {{ editorInstructions }}
        </span>
        <ClientOnly>
          <upload
            class="bg-cloudinary-orange text-white rounded py-2 px-8 my-3 text-xs hover:bg-orange-700"
            @avatar="updateAvatar"
            :config="uploadConfig"
          />
        </ClientOnly>
      </div>
      <div class="tranform--tabs bg-gray-100 flex-1 flex flex-col mt-3">
        <div class="flex items-center text-sm">
          <button
            class="px-5 py-3 border-r border-gray-400"
            :class="tabClass('preset')"
            @click="setTab('preset')"
          >
            {{ $t("editBadge.editSection.presetTab") }}
          </button>
          <div class="flex-1" :class="tabClass('customize')">
            <button class="px-5 py-3 text-left" @click="setTab('customize')">
              {{ $t("editBadge.editSection.customizeTab") }}
            </button>
          </div>
        </div>
        <div class="bg-cloudinary-light flex-1">
          <div
            class="flex flex-wrap justify-between overflow-auto h-full"
            v-show="selectedTab === 'preset' && hasAvatar"
          >
            <preset
              class="pt-3 mb-5"
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
    </div>
  </div>
</template>
<script>
import editor from "@/mixins/editor";
import TransformEditor from "@/components/TransformEditor";

export default {
  name: "EditorDesktop",
  mixins: [editor],
  components: { TransformEditor },
  computed: {
    editorInstructions() {
      return this.hasAvatar
        ? this.$t("editBadge.editSection.heading")
        : this.$t("editBadge.editSection.upload");
    },
  },
};
</script>
