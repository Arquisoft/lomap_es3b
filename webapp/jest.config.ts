//Añadido por mi, lo enseño Irene en clase
import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
    testEnvironment:"jsdom",
    moduleNameMapper: {"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/assetsTransformer.ts", "\\.(css|less)$": "<rootDir>/assetsTransformer.ts"},
    transform: {
        "^.+\\.tsx?$":'ts-jest'
    },
    collectCoverage:true,
    collectCoverageFrom:["!**/__tests__/**", "**/*.tsx"],
    transformIgnorePatterns: [
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$",
    ]
};

export default config;

