import { Preview } from "@storybook/react";

import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

import { theme } from "../src/styles/theme";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
      },
    },
    chakra: {
      theme,
    },
  },
};

export default preview;
