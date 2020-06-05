import {
  adjust,
  sun,
  exposure,
  thermometer,
  palette,
  constrast,
} from "@/assets/icons";
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

const normalizeEffects = (transformations) => {
  const regex = /\:(.*)/;
  const effects = {};

  Object.keys(transformations).forEach((key) => {
    const effect = transformations[key].effect;

    if (effect) {
      effects[key] = {
        value: regex.exec(effect)[1],
      };

      if (transformations[key].color) {
        effects[key].color = transformations[key].color;
      }
    } else if (key === "adjust") {
      effects[key] = {
        value: transformations[key].angle || 0,
      };
    }
  });

  return effects;
};

const customizer = {
  components: { InputSlider, Adjustment, Colorize, Exposure },
  props: {
    effects: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    const initialEffects = normalizeEffects(this.effects);

    return {
      initialEffects,
      options,
      types,
    };
  },
  computed: {
    transformEffects() {
      return normalizeEffects(this.effects);
    },
    brightness() {
      return this.transformEffects.brightness?.value || "50";
    },
    constrastValue() {
      return this.transformEffects.contrast?.value || "50";
    },
    warmth() {
      return this.transformEffects.warmth?.value || "50";
    },
    adjustment() {
      return this.transformEffects.adjust;
    },
    exposure() {
      return this.transformEffects.exposure;
    },
    colorize() {
      return this.transformEffects.colorize;
    },
    shadow() {
      return this.transformEffects.shadow;
    },
  },
  methods: {
    setColorize(colorize) {
      this.$emit("customize", colorize);
    },
    setRotate(direction) {
      this.$emit("customize", direction);
    },
    setBrightness(brightness) {
      this.$emit("customize", {
        effect: {
          effect: `brightness:${brightness}`,
        },
        type: "brightness",
      });
    },
    setContrast(contrast) {
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
