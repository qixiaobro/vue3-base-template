module.exports = (ctx) => {
  const isNormalDpr =
    /\.css$/.test(ctx.file.basename) && /\bvant\b/.test(ctx.file.dirname);
  return {
    plugins: {
      autoprefixer: {},
      "postcss-px-to-viewport": {
        viewportWidth: isNormalDpr ? 375 : 750,
        propList: isNormalDpr
          ? [("*", "!font", "!font-size", "!border", "!border-width")]
          : ["*", "font", "font-size", "border", "border-width"],
        selectorBlackList: [],
        unitPrecision: 3,
        minPixelValue: 1,
      },
    },
  };
};
