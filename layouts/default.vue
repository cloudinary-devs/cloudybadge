<template>
  <div class="mx-auto my-0 flex flex-col flex-1 h-full">
    <slot name="header" />
    <nuxt class="flex-1 font-display flex flex-col" />
    <footer class="w-100 bg-primary-700">
      <div class="text-center text-white font-display">
        {{ $t("title") }} {{ $t("version") }}
      </div>
    </footer>
  </div>
</template>

<style>
html,
body,
#__nuxt,
#__layout {
  height: 100%;
}

body {
  @apply m-0 p-0 font-display;
  line-height: 1.5;
}
</style>
