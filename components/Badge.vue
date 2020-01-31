<template>
  <div class="upload--result--wrapper flex mr-3">
    <cld-image :public-id="badgeUrl"
      class="border-2 self-center"
      :transformation="transformation"
      height="800" crop="fill"
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
      default: ''
    },
    company: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    avatarOverlay: {
      type: String,
      default: ''
    },
    effect: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    transformation() {
      return [{
        overlay: this.avatarOverlay,
        radius:"max",
        width:"800",
        height:"800",
        x:"6",
        y:"320",
        crop:"thumb",
        ...this.effect,
      }, {
        overlay: `text:Roboto_80:${this.name}`,
        y: "-1000"
      }, {
        overlay: `text:Roboto_50:${this.company}`,
        y: "-900"
      }]
    },
  }
}
</script>