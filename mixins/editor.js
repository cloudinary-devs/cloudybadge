import BadgeComp from "@/components/Badge";
import UploadBtn from "@/components/Upload";
import Preset from "@/components/Preset";
import presets from "@/assets/presets.json";
import { copy, share, done, settings } from "@/assets/icons";
import Effects from "@/components/Effects";
import SaveModal from "@/components/SaveModal";

const editor = {
  components: {
    BadgeComp,
    UploadBtn,
    Preset,
    Effects,
  },
  props: {
    badge: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedTab: "preset",
      selectedPreset: presets[0],
      presets,
      copy,
      share,
      done,
      settings,
      customEffects: [],
      showEffects: false,
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
      return this.hasAvatar ? "bg-cloudinary-green" : "bg-gray-300";
    },
    uploadConfig() {
      return {
        cloudName: "cdemo",
        uploadPreset: "hackb4xmas", //TODO: event preset
        folder: `_cloudybadge/${this.badge.eventId}/assets`,
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
  },
  methods: {
    setTab(tab) {
      this.selectedTab = tab;
    },
    tabClass(tab) {
      return this.selectedTab === tab
        ? "bg-cloudinary-light text-cloudinary"
        : "border-b text-gray-500";
    },
    applyEffect(effect) {
      this.selectedPreset = effect;
    },
    saveBadge() {
      this.$modal.show(
        SaveModal,
        {
          voteLink: `/event/${this.badge.eventId}?vid=${this.badge.editKey}`,
        },
        {
          height: "auto",
          width: "350",
        }
      );
    },
    customizeEffect(transform) {
      this.customEffects = {
        ...this.customEffects,
        [transform.type]: transform.effect,
      };
    },
  },
};

export default editor;
