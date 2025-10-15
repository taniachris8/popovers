module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
};
