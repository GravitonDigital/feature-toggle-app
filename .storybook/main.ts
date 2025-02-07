import type { StorybookConfig } from "@storybook/server-webpack5";

const config: StorybookConfig = {
  typescript: {
    check: false,
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.ts"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling-webpack",
      options: {
        postCss: true,
      },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-mdx-gfm",
    "@storybook/addon-webpack5-compiler-swc",
    "@itemconsulting/preset-enonic-xp",
  ],
  staticDirs: ["../src/main/resources/assets"],
  framework: {
    name: "@storybook/server-webpack5",
    options: {},
  },
};

export default config;
