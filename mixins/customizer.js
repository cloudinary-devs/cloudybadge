import {
  adjust,
  sun,
  exposure,
  thermometer,
  palette,
  constrast,
} from "@/plugins/icons";
import InputSlider from "@/components/InputSlider";
import Exposure from "@/components/Customizers/Exposure";
import Adjustment from "@/components/Customizers/Adjustment";
import Colorize from "@/components/Customizers/Colorize";

const options = {
  adjust: {
    icon: adjust,
    type: "adjust",
  },
  brightness: {
    icon: sun,
    type: "brightness",
  },
  contrast: {
    icon: constrast,
    type: "contrast",
  },
  exposure: {
    icon: exposure,
    type: "exposure",
  },
  colorize: {
    icon: palette,
    type: "colorize",
  },
  warmth: {
    icon: thermometer,
    type: "warmth",
  },
};

const types = Object.keys(options);

const customizer = {
  components: { InputSlider, Adjustment, Colorize, Exposure },
  data() {
    return {
      brightness: "50",
      constrastValue: "50",
      warmth: "50",
      options,
      types,
    };
  },
  methods: {
    setColorize(colorize) {
      this.$emit("customize", colorize);
    },
    setRotate(direction) {
      this.$emit("customize", direction);
    },
    setBrightness(brightness) {
      this.brightness = brightness;
      this.$emit("customize", {
        effect: {
          effect: `brightness:${brightness}`,
        },
        type: "brightness",
      });
    },
    setContrast(contrast) {
      this.constrastValue = contrast;
      this.$emit("customize", {
        effect: {
          effect: `contrast:${contrast}`,
        },
        type: "contrast",
      });
    },
    setExposure(exposure) {
      this.$emit("customize", exposure);
    },
    setWarm(sepia) {
      this.warmth = sepia;
      this.$emit("customize", {
        effect: {
          effect: `sepia:${sepia}`,
        },
        type: "warmth",
      });
    },
  },
};

export default customizer;
