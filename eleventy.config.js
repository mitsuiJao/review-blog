module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy("public");

  eleventyConfig.addFilter("date", (dateObj, format = "%Y-%m-%d") => {
    const d = new Date(dateObj);
    const tokens = {
      "%Y": d.getFullYear(),
      "%m": String(d.getMonth() + 1).padStart(2, "0"),
      "%d": String(d.getDate()).padStart(2, "0"),
    };
    return format.replace(/%[Ymd]/g, (token) => tokens[token]);
  });
  
  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
  };
};
