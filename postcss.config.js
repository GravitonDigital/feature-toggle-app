module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: {
    "postcss-import": {},
    "postcss-url": {
      url: "copy",
    },
    stylelint: {},
    "postcss-reporter": {
      clearReportedMessages: true,
    },
    "postcss-normalize": {},
    "postcss-nesting": {},
    autoprefixer: {},
    cssnano: {},
  },
});
