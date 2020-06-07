require("reflect-metadata");

module.exports = {
  rootDir: "src",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  coverageReporters: [
    "json",
    "lcov",
    "text",
    "clover",
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};
