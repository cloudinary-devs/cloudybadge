import Vue from "vue";
import EditorMobile from "@/components/EditorMobile.vue";
import EditorDesktop from "@/components/EditorDesktop.vue";
import { isMobileOnly } from "mobile-device-detect";

Vue.component("Editor", isMobileOnly ? EditorMobile : EditorDesktop);
