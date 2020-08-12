<template>
  <div class="layout flex flex-col flex-1 h-full">
    <slot name="header" />
    <nuxt class="flex-1" />
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
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.layout {
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}
</style>
