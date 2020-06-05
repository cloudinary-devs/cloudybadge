<template>
  <div class="font-code text-left leading-tight">
    <div v-if="effect">{{ getSign(true) }}</div>
    <div v-for="(value, name) in effect" :key="name" class="ml-3">
      <div v-if="['string', 'number'].includes(typeof value)" class="mb-1">
        <span
          class="text-cloudinary-gray break-words"
          v-if="!Array.isArray(effect)"
        >
          {{ name }}:
        </span>
        <span class="text-cloudinary break-words ml-2">"{{ value }}",</span>
      </div>
      <div v-else>
        <span
          class="text-cloudinary-gray break-words"
          v-if="!Array.isArray(effect)"
          >{{ name }}:
        </span>
        <effects :effect="value" />
      </div>
    </div>
    <div v-if="effect">{{ getSign() }}</div>
  </div>
</template>
<script>
export default {
  name: "Effects",
  props: {
    effect: {
      type: [Object, Array],
    },
  },
  methods: {
    getSign(start) {
      if (Array.isArray(this.effect)) return start ? "[" : "],";
      else if (typeof this.effect === "object") return start ? "{" : "},";
      else return "";
    },
  },
};
</script>
