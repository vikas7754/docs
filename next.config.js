const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  flexsearch: true,
  staticImage: true,
  defaultShowCopyCode: true,
});

module.exports = {
  ...withNextra(),
  output: "export",
};
