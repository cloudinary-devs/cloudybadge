import presets from "@/assets/presets.json";
import { copy, share, done, settings } from "@/assets/icons";
import SaveModal from "@/components/SaveModal";

const editor = {
  props: {
    badge: {
      type: Object,
      required: true,
    },
  },
  data() {
    const transformation = this.badge.avatar?.transformation
      ? JSON.parse(this.badge.avatar?.transformation.replace(/'/g, `"`))
      : {};

    return {
      selectedTab: "preset",
      selectedPreset: transformation.selectedPreset || presets[0],
      presets,
      copy,
      share,
      done,
      settings,
      customEffects: transformation.customEffects || [],
      showEffects: false,
      isSaving: false,
    };
  },
  computed: {
    name() {
      return `${this.badge.firstName} ${this.badge.lastName}`;
    },
    avatarOverlay() {
      return (
        this.badge.avatar?.public_id.replace(/\//gm, ":") ||
        "fetch:https://res.cloudinary.com/mayashavin/image/upload/v1576215298/avatar_person.svg"
      );
    },
    hasAvatar() {
      return !!this.badge.avatar?.public_id;
    },
    saveClass() {
      return this.hasAvatar && !this.isSaving
        ? "bg-cloudinary-green"
        : "bg-gray-300";
    },
    uploadConfig() {
      return {
        cloudName: "cdemo",
        uploadPreset: "hackb4xmas", //TODO: event preset
        folder: `_cloudybadge/${this.badge.event.id}/assets`,
      };
    },
    chosenEffect() {
      const effect = {
        preset: this.selectedPreset,
        transformation: Object.keys(this.customEffects).map(
          (key) => this.customEffects[key]
        ),
      };

      return effect;
    },
    showEffectsBtnColor() {
      return this.showEffects
        ? "bg-cloudinary-darkest"
        : "bg-cloudinary-darker";
    },
    saveBtnLabel() {
      return this.$t(`editBadge.actions.${this.isSaving ? "saving" : "save"}`);
    },
  },
  methods: {
    setTab(tab) {
      this.selectedTab = tab;
    },
    tabClass(tab) {
      return this.selectedTab === tab
        ? "bg-cloudinary-light text-primary-600"
        : "border-b text-gray-500";
    },
    applyEffect(effect) {
      this.selectedPreset = effect;
    },
    async saveBadge() {
      if (this.isSaving) return;

      this.isSaving = true;

      const transformation = JSON.stringify({
        customEffects: this.customEffects,
        selectedPreset: this.selectedPreset,
      }).replace(/"/g, "'");

      const response = await this.$axios.$post(
        `/api/avatar/${this.badge.avatar._id ? "update" : "create"}`,
        {
          payload: {
            ...this.badge.avatar,
            transformation,
            badgeId: this.badge._id,
          },
        }
      );

      this.isSaving = false;

      if (response.error) {
        const text = response.error || this.$t("editBadge.status.error");
        this.$toast.error(text);
      } else if (response.avatar) {
        this.$modal.show(
          SaveModal,
          {
            voteLink: `${window.location.protocol}//${window.location.hostname}/event/${this.badge.event.id}?vid=${this.badge.editKey}`,
          },
          {
            height: "auto",
            width: "350",
          }
        );
      }
    },
    customizeEffect(transform) {
      this.customEffects = {
        ...this.customEffects,
        [transform.type]: transform.effect,
      };
    },
    updateAvatar(avatar) {
      this.badge.avatar = avatar;
    },
  },
};

export default editor;
