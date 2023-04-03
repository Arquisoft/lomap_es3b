//Añadido por mi, lo enseño Irene en clase
import type {Config} from 'jest';
import {defaults} from 'jest-config';

const config:Config = {
    moduleFileExtensions: [...defaults.moduleFileExtensions,'mts'],
};

//export default config;

export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
}