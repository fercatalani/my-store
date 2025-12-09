import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "^.+\\.(png|jpg|jpeg|gif|svg|webp|ico|bmp)$":
      "<rootDir>/__mocks__/fileMock.js",
    "^next/link$": "<rootDir>/__mocks__/next/link.tsx",
    "^next/image$": "<rootDir>/__mocks__/next/image.tsx",
  },
};

export default createJestConfig(customJestConfig);
