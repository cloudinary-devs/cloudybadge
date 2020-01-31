<template>
  <div class="m-3 mb-5 flex-no-shrink hover:bg-grey user--preset-item">
    <h4 class="uppercase text-center ml-2 mr-2 mb-3 mt-2">{{effect.name}}</h4>
    <div  @click="applyEffect" class="container-transformation-effect cursor-pointer m-2 mt-0">
      <cld-image v-bind="effect" :public-id="`${avatar.public_id}.png`" width="1080" height="1080" radius="max">
        <cld-transformation v-if="effect.extra" v-bind="extra"/>
      </cld-image>
    </div>
    <div class="relative w-full">
      <div class="text-center p-2 pt-4 text-black user--preset-item--effect hidden absolute bg-grey w-full border-t">
        <h5 class="uppercase mb-3 text-black">Effect used</h5>
        <effect-details :effect="effect"/>
      </div>
    </div>
  </div>
</template>
<script>
import EffectDetails from '@/components/EffectDetails';

export default {
  components: { EffectDetails },
  props: {
    effect: {
      type: Object,
      require: true
    },
    avatar: {
      type: Object,
      require: true,
    }
  },
  methods: {
    applyEffect() {
      this.$emit('applyeffect', this.effect);
    }
  }
}
</script>
<style scoped>
.container-transformation-effect {
  width: 200px;
  height: 200px;
}

.user--preset-item:hover .user--preset-item--effect {
  display: block;
}

.user--preset-item {
  max-width: 220px;
}
</style>