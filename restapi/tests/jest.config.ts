import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
    rootDir: './../',
    transform: {
        "^.+\\.ts?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom:["api.ts, config.ts"],
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
};

export default config;