const filesMinifier = require("./src/files-minifier");

module.exports = (eleventyConfig) => {
  eleventyConfig.addTransform("files-minifier", filesMinifier);
};
