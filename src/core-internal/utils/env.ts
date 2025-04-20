import { Config } from "../conf/env"
import dotenv from "dotenv"
import path from "path"

dotenv.config(
    {
        path: path.resolve(__dirname, "../../../.env"),
    }
)


export const Env: Config = {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || "8000",
    production: process.env.PRODUCTION === "prod",

    gRPCHost: process.env.GRPC_HOST || "127.0.0.1",
    gRPCPort: process.env.GRPC_PORT || "50051",

    dbRead: {
        host: process.env.DB_READ_HOST || "localhost",
        port: process.env.DB_READ_PORT || "5432",
        user: process.env.DB_READ_USER || "postgres",
        password: process.env.DB_READ_PASS || "postgres",
        database: process.env.DB_READ_NAME || "postgres",
        schema: process.env.DB_READ_SCHEMA || "public",
    },
    dbWrite: {
        host: process.env.DB_WRITE_HOST || "localhost",
        port: process.env.DB_WRITE_PORT || "5432",
        user: process.env.DB_WRITE_USER || "postgres",
        password: process.env.DB_WRITE_PASS || "postgres",
        database: process.env.DB_WRITE_NAME || "postgres",
        schema: process.env.DB_WRITE_SCHEMA || "public",
    },

    elasticSearch: {
        host: process.env.ELASTIC_HOST || "http://localhost:9200",
        port: process.env.ELASTIC_PORT || "9200",
    },
}