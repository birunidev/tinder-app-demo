const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

const configWithNativeWind = withNativeWind(config, {
  input: "./src/styles/global.css",
  inlineRem: 16,
});

configWithNativeWind.resolver = {
  ...configWithNativeWind.resolver,
  alias: {
    ...(configWithNativeWind.resolver?.alias || {}),
    "@": path.resolve(__dirname, "src"),
  },
};

module.exports = configWithNativeWind;
