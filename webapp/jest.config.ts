//Añadido por mi, lo enseño Irene en clase
import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
    testEnvironment:"jsdom",
    moduleNameMapper: {"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/assetsTransformer.js", "\\.(css|less)$": "<rootDir>/assetsTransformer.js"},
    transform: {
        "^.+\\.tsx?$":'ts-jest'
    },
    collectCoverage:true,
    collectCoverageFrom:["!**/__tests__/**", "**/*.tsx"],
};

export default config;

