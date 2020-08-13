<template>
  <div>
    <c-image
      :public-id="publicId"
      :transformation="transformation"
      :width="width"
      crop="scale"
      fetchFormat="png"
      class="thumbnail"
    />
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      require: true,
    },
    avatar: {
      type: Object,
    },
    width: String,
  },
  computed: {
    publicId() {
      return this.avatar && this.avatar.public_id
        ? this.avatar.public_id
        : "https://res.cloudinary.com/mayashavin/image/upload/v1576215298/avatar_person.svg";
    },
    transformation() {
      const transformation = this.avatar?.transformation
        ? JSON.parse(this.avatar?.transformation.replace(/'/g, `"`))
        : {};
      const effect = {
        preset: transformation.selectedPreset || {},
        transformation: transformation.customEffects
          ? Object.keys(transformation.customEffects).map(
              (key) => transformation.customEffects[key]
            )
          : [],
      };

      return this.avatar && this.avatar.public_id
        ? [
            {
              radius: "max",
              width: this.width,
              height: this.width,
              x: "6",
              y: "320",
              crop: "thumb",
            },
            effect.preset || {},
            ...(effect.transformation || []),
            {
              radius: "max",
            },
          ]
        : [];
    },
  },
};
</script>
