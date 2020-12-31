const htmlmin = require("html-minifier");
const { pd: prettyData } = require("pretty-data");

module.exports = (value, outputPath) => {
  // Make sure that there is a file written before trying to minifying it
  if (!outputPath) {
    return value;
  }

  // Check if the outputPath end by the extension
  const pathEndBy = (extension) => outputPath.includes(extension);

  // CSS
  if (pathEndBy(".css")) {
    return prettyData.cssmin(value);
  }

  // HTML and XSL
  if (pathEndBy(".html") || pathEndBy(".xsl")) {
    const config = {
      collapseBooleanAttributes: true, // Omit attribute values from boolean attributes
      collapseWhitespace: true, // Collapse white space that contributes to text nodes in a document tree
      decodeEntities: true, // Use direct Unicode characters whenever possible
      html5: true, // Parse input according to HTML5 specifications
      minifyCSS: true, // Minify CSS in style elements and style attributes (uses clean-css)
      minifyJS: true, // Minify JavaScript in script elements and event attributes (uses UglifyJS)
      removeComments: true, // Strip HTML comments
      removeEmptyAttributes: true, // Remove all attributes with whitespace-only values
      removeEmptyElements: false, // Remove all elements with empty contents
      sortAttributes: true, // Sort attributes by frequency
      sortClassName: true, // Sort style classes by frequency
      useShortDoctype: true, // Replaces the doctype with the short (HTML5) doctype
    };

    if (pathEndBy(".xsl")) {
      config.keepClosingSlash = true;
    }

    return htmlmin.minify(value, config);
  }

  // JSON and WebManifest
  if (pathEndBy(".json") || pathEndBy(".webmanifest")) {
    return prettyData.jsonmin(value);
  }

  // XML
  if (pathEndBy(".xml")) {
    return prettyData.xmlmin(value);
  }

  return value;
};
