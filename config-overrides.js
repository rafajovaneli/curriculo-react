const JavaScriptObfuscator = require("webpack-obfuscator");

module.exports = function override(config, env) {
  if (env === "production") {
    config.plugins.push(
      new JavaScriptObfuscator(
        {
          rotateStringArray: true,
          stringArray: true,
          stringArrayThreshold: 0.75,
          transformObjectKeys: true,
          unicodeEscapeSequence: false,
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.75,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.4,
          debugProtection: true,
          debugProtectionInterval: 4000,
          disableConsoleOutput: true,
          identifierNamesGenerator: "hexadecimal",
          log: false,
          renameGlobals: false,
          selfDefending: true,
          splitStrings: true,
          splitStringsChunkLength: 10,
          stringArrayEncoding: ["base64"],
          target: "browser",
          numbersToExpressions: true,
          simplify: true,
        },
        ["excluded_bundle_name.js"]
      )
    );
  }
  return config;
};
