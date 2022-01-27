module.exports = {
  stories: [],
  addons: [
    "@storybook/addon-links",
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    "@storybook/addon-interactions",
  ],
/*
  addons: [
    "@storybook/addon-essentials",
  ],
*/
  // uncomment the property below if you want to apply some webpack config globally
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs

  //   // Return the altered config
  //   return config;
  // },
};
