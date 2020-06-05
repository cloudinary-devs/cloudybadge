import Vue from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import EditorMobile from "@/components/EditorMobile.vue";
import EditorDesktop from "@/components/EditorDesktop.vue";
import { isMobileOnly } from "mobile-device-detect";

Vue.component("SvgIcon", SvgIcon);
Vue.component("Editor", isMobileOnly ? EditorMobile : EditorDesktop);
