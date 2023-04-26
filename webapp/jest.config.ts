//Añadido por mi, lo enseño Irene en clase
import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],

    transform: {
        "^.+\\.tsx?$": "ts-jest"
    }
};

export default config;

