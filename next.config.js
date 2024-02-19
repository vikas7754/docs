const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  flexsearch: true,
  defaultShowCopyCode: true,
});

module.exports = withNextra();
