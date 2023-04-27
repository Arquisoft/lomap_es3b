export default {
    rootDir: './../',
    transform: {
        "^.+\\.ts?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom:["api.ts, config.ts, rplaces.ts"]
}