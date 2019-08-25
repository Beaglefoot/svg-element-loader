module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '\\.ts?$': 'ts-jest'
  },
  testRegex: '\\.test\\.ts?$'
};
