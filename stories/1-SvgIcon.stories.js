import SvgIcon from "../components/SvgIcon.vue";
import * as icons from "../assets/icons";

export default { title: "SvgIcon" };
export const listOfIcons = () => ({
  components: { SvgIcon },
  data() {
    return {
      icons: Object.keys(icons).map((key) => ({ ...icons[key], name: key })),
    };
  },
  template: `
  <div>
    <h2 class="text-cloudinary font-3xl font-semibold mx-3 mt-5">List of current used icons</h2>
    <div class="flex p-4 flex-wrap">
      <div
        v-for="(icon, index) in icons" :key="index"
        class="m-2 text-center"
      >
        <svg-icon
          :icon="icon.path"
          :viewBox="icon.viewBox"
          size="32px"
          class="mb-3 flex justify-center"
        />
        <span class="font-small">{{icon.name}}</span>
      </div>      
    </div>
  </div>
  `,
});

export const iconWithSizes = () => ({
  components: { SvgIcon },
  data() {
    return {
      icon: icons.settings,
      sizes: ["24px", "32px", "48px"],
    };
  },
  template: `
  <div>
    <h2 class="text-cloudinary font-3xl font-semibold mx-3 mt-5">Sizes</h2>
    <div class="flex p-4">
      <div
        v-for="size in sizes" :key="size"
        class="m-2 text-center"
      >
        <svg-icon
          :icon="icon.path"
          :viewBox="icon.viewBox"
          :size="size"
          class="mb-3 flex justify-center text-cloudinary"
        />
        <span class="font-small">{{size}}</span>
      </div>      
    </div>
  `,
});

export const iconWithColors = () => ({
  components: { SvgIcon },
  data() {
    return {
      icon: icons.settings,
      colors: [
        "text-cloudinary-sunny",
        "text-cloudinary",
        "text-cloudinary-green",
      ],
    };
  },
  template: `
  <div>
    <h2 class="text-cloudinary font-3xl font-semibold mx-3 mt-5">Colors</h2>
    <p class="flex mx-3 mt-2">We use <pre> currentColor</pre></p>
    <div class="flex p-4">
      <div
        v-for="color in colors" :key="size"
        class="m-2 text-center"
        :class="color"
      >
        <svg-icon
          :icon="icon.path"
          :viewBox="icon.viewBox"
          size="32px"
          class="mb-3 flex justify-center"
        />
        <span class="font-small">{{color}}</span>
      </div>      
    </div>
  `,
});
