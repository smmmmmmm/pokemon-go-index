const path = require("path");

module.exports = ({ config }) => {
  config.resolve.alias = {
    "@": path.resolve(__dirname, "../src/"),
  };

  config.module.rules.push({
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  });

  return config;
};
