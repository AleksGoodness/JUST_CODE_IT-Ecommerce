export default {
  testEnvironment: "jest-fixed-jsdom",

  testEnvironmentOptions: {
    customExportConditions: [''],
  },

  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.app.json" }],
  },

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  extensionsToTreatAsEsm: [".ts", ".tsx"]
};

