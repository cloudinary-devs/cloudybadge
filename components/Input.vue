<template>
  <div class="flex flex-col text-left">
    <label
      :for="name"
      class="relative input--label transition-all duration-500 ease-in-out"
    >
      {{ label }}
      <span aria-hidden="true" v-if="required">*</span>
    </label>
    <input
      :name="name"
      v-model="input"
      :type="type"
      :required="required"
      class="p-3 border-b mt-2 input--field"
      @focus="animate"
      @blur="animate"
      @input="animate"
      ref="inputRef"
      :pattern="pattern"
      :title="title"
    />
  </div>
</template>
<script>
const addAnimation = (target) => {
  const { previousElementSibling } = target;
  const { classList } = previousElementSibling;
  const TARGET_CLASS = "focused";
  const action = classList.contains(TARGET_CLASS) ? "remove" : "add";

  classList[action](TARGET_CLASS);
};

export default {
  props: {
    label: String,
    value: String,
    name: String,
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: false,
    },
    pattern: String,
    title: String,
  },
  computed: {
    input: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    animate(event) {
      const { target } = event;
      if (target.value || event.type === "input") return;
      addAnimation(target);
    },
    addAnimateEffect(target) {
      const { previousElementSibling } = target;
      const { classList } = previousElementSibling;
      const TARGET_CLASS = "focused";
      const action = classList.contains(TARGET_CLASS) ? "remove" : "add";
    },
  },
  mounted() {
    if (this.value) {
      addAnimation(this.$refs.inputRef);
    }
  },
};
</script>
<style scoped>
.input--label {
  top: 50px;
  z-index: 1;
}

.input--label.focused {
  top: 0px;
}

.input--field {
  background: transparent;
  z-index: 10;
}
</style>
