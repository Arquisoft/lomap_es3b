export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testMatch: ["**/steps/*.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper:{"^uuid$": "uuid",
    ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub"
    },
    preset: "jest-puppeteer",
    testTimeout: 30000,
}