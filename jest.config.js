module.exports = {
  transform: {
    "^.+\\.m?js$": "babel-jest"
  },
  moduleFileExtensions: ["js", "mjs"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)", "**/?(*.)+(spec|test).[m]js"],
  testPathIgnorePatterns: ["/node_modules/", "s3Utils-mock.test.js" ],
};