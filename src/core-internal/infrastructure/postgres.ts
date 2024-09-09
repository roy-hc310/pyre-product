import pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";
import { Env } from "../utils/env";



export class PostgresInfrastructure {
    dbReadPool: pgPromise.IDatabase<{}, pg.IClient>
    dbWritePool: pgPromise.IDatabase<{}, pg.IClient>

    constructor() {

        const pgpRead = pgPromise()
        const pgpWrite = pgPromise()


        const dsnRead = {
            host: Env.dbRead.host,
            port: Number(Env.dbRead.port),
            database: Env.dbRead.database,
            user: Env.dbRead.user,
            password: Env.dbRead.password,
            search_path: Env.dbRead.schema,
        }
        this.dbReadPool = pgpRead(dsnRead)

        const dsnWrite = {
            host: Env.dbRead.host,
            port: Number(Env.dbRead.port),
            database: Env.dbRead.database,
            user: Env.dbRead.user,
            password: Env.dbRead.password,
            search_path: Env.dbRead.schema,
            
        }
        this.dbWritePool = pgpWrite(dsnWrite)
    }


}