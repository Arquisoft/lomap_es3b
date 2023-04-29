
import type {Config} from 'jest';

const config:Config = {
    transform: {
        "^.+\\.ts?$": "ts-jest"
    },
    testMatch: ["**/steps/*.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "css", "jpg"],
    moduleNameMapper: { "^uuid$": "uuid" },
    preset: "jest-puppeteer",
    testTimeout: 70000
}

export default config;