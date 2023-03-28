const { pathsToModuleNameMapper } = require("ts-jest");
const { paths } = require("./tsconfig").compilerOptions;

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "dist"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, { prefix: "<rootDir>" }),
  },
};
