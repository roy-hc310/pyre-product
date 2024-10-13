
import express, { Request, Response } from "express"
import { Env } from "./core-internal/utils/env"
import { Application } from "./core/application"
import { Router } from "./core/route"
import cors from "cors"
import morgan from "morgan"
import fileUpload from "express-fileupload"

import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

// http server
const e = express()
e.use(express.json())
e.use(express.urlencoded({ extended: false }))
e.use(cors())
e.use(morgan("combined"))
e.use(fileUpload({ createParentPath: true }))


const application = new Application()
Router(e, application)

e.listen(Env.port, () => {
    console.log(`listening on port ${Env.port}`)
})

//gRPC server: productProto
const protoPath = __dirname + "/../protos/product.proto"
const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})
const gRPCServer = new grpc.Server()

const productProto = grpc.loadPackageDefinition(packageDefinition).product_proto as any
gRPCServer.addService(productProto.ProductProto.service, {
    GetProduct: application.productGrpcService.GetProduct.bind(application.productGrpcService)
})

gRPCServer.bindAsync(Env.gRPCHost + ":" + Env.gRPCPort, grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.log(error)
    }
    console.log("gRPC Server running on " + Env.gRPCHost + ":" + Env.gRPCPort)
})

// initialize migration: npx db-migrate init

// create a new migration file: 
//npx db-migrate create initialize_tables -e pg --sql-file

// up
// npx db-migrate up -e pg

// protoc --plugin=protoc-gen-ts_proto=".\\node_modules\\.bin\\protoc-gen-ts_proto.cmd" --ts_proto_out=./src/core-internal ./proto/product.proto