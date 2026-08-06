const { spawn } = require("node:child_process");

function runPagefind() {
  return new Promise((resolve, reject) => {
    const child = spawn("npx", ["pagefind", "--site", "_site"], {
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`pagefind exited with code ${code}`))
    );
  });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/article/**/*.{jpg,jpeg,png,gif,webp,svg}");

  eleventyConfig.on("eleventy.after", async () => {
    await runPagefind();
  });

  eleventyConfig.addFilter("date", (dateObj, format = "%Y-%m-%d") => {
    const d = new Date(dateObj);
    const tokens = {
      "%Y": d.getFullYear(),
      "%m": String(d.getMonth() + 1).padStart(2, "0"),
      "%d": String(d.getDate()).padStart(2, "0"),
    };
    return format.replace(/%[Ymd]/g, (token) => tokens[token]);
  });

  eleventyConfig.addFilter("byType", (posts, type) =>
    posts.filter((post) => post.data.type === type)
  );

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
