declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGODB:string
        }
    }
}

export { }