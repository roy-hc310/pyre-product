
export interface Config {
    host: string
    port: string
    production: boolean

    dbRead: {
        host: string
        port: string
        user: string
        password: string
        database: string
        schema: string
    }

    dbWrite: {
        host: string
        port: string
        user: string
        password: string
        database: string
        schema: string
    }
}