import Palette from "./Palette.story.vue";

export default {
  title: "Palette",
};

const mainThemes = [
  "",
  "gray",
  "darker",
  "darkest",
  "light",
  "black",
  "green",
  "pale",
  "pink",
  "indigo",
  "sunny",
  "orange",
  "sea",
  "indigo-dark",
  "sea-light",
  "transparent",
];

export const mainPalettes = () => ({
  components: { Palette },
  data() {
    return {
      palettes: mainThemes.map(
        (theme) => `cloudinary${theme ? `-${theme}` : ""}`
      ),
    };
  },
  template: `
  <div>
    <h1 class="text-cloudinary font-3xl font-semibold mx-3 mt-5">CloudyBADGE's Main Palettes</h1>
    <div class="flex p-4 flex-wrap mx-3">
      <div
        v-for="(palette, index) in palettes" 
        :key="index"
        class="m-2 text-center"
      >
        <palette :color="palette"/>
      </div>      
    </div>
  </div>
  `,
});
