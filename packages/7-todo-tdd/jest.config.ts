import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(\\.|/)(test|spec)\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
};
export default config;
