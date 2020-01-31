<template>
  <div class="font-mono text-sm text-left leading-tight">
    <div v-if="effect">{{getSign(true)}}</div>
    <div v-for="(value, name) in effect" :key="name" class="ml-3">
      <div v-if="typeof value === 'string'"><span class="text-indigo-darker break-words">{{name}}</span>:<span class="text-orange-darker break-words ml-2">"{{value}}"</span></div>
      <div v-else>
        <span class="text-indigo-darker break-words">{{name}}: </span>
        <effect-details :effect="value"/>
      </div>
    </div>
    <div v-if="effect">{{getSign()}}</div>
  </div>
</template>
<script>
export default {
  name: 'EffectDetails',
  props: {
    effect: {
      type: Object,
    }
  },
  methods: {
    getSign(start) {
      if (Array.isArray(this.effect)) return start ? '[' : ']'
      else if (typeof this.effect === 'object') return start ? '{' : '}'
      else return ''
    }
  }
}
</script>