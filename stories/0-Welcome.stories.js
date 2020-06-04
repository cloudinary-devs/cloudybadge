import { linkTo } from "@storybook/addon-links";
import "../.storybook/utils.css";
import Welcome from "./Welcome";

export default {
  title: "Welcome",
  component: Welcome,
};

export const ToCloudyBADGE = () => ({
  components: { Welcome },
  template: '<welcome :showApp="action" />',
  methods: { action: linkTo("Button") },
});

ToCloudyBADGE.story = {
  name: "to CloudyBADGE",
};
