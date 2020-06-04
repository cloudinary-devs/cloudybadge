<template>
  <div class="flex">
    <cld-image
      :public-id="badgeUrl"
      class="border-2 border-cloudinary self-center"
      :transformation="transformation"
      :height="height"
      crop="fill"
    />
  </div>
</template>
<script>
export default {
  props: {
    badgeUrl: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    avatarOverlay: {
      type: String,
      default: "",
    },
    effect: {
      type: Object,
      default: () => ({}),
    },
    height: {
      type: String,
      default: "800",
    },
  },
  computed: {
    transformation() {
      return [
        {
          overlay: this.avatarOverlay,
          width: "800",
          height: "800",
          crop: "thumb",
        },
        this.effect.preset || {},
        ...(this.effect.transformation || []),
        {
          radius: "max",
          border: "10px_solid_white",
        },
        {
          x: "6",
          y: "320",
          flags: "layer_apply",
        },
        {
          overlay: `text:Roboto_80:${this.name}`,
          y: "-1000",
        },
        {
          overlay: `text:Roboto_50:${this.company}`,
          y: "-900",
        },
      ];
    },
  },
};
</script>
