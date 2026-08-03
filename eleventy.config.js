module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  return {
    dir: {
      input: ".",
      includes: "src",
      layouts: "src",
      output: "_site",
    },
  };
};
