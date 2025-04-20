import * as grpc from "@grpc/grpc-js";
import {GetProductRequest, GetProductResponse} from "../../../core-internal/proto/product";
import { PostgresInfrastructure } from "../../../core-internal/infrastructure/postgres";
import {validate} from "uuid"
import { ElasticSearchInfrastructure } from "../../../core-internal/infrastructure/elastic-search";

export class ProductGrpcService {
    postgresInfra: PostgresInfrastructure
    elasticSearchInfra: ElasticSearchInfrastructure
    constructor(postgresInfra: PostgresInfrastructure, elasticSearchInfra: ElasticSearchInfrastructure) {
        this.postgresInfra = postgresInfra
        this.elasticSearchInfra = elasticSearchInfra
    }

    async GetProduct(call: grpc.ServerUnaryCall<GetProductRequest, GetProductResponse>, callback: grpc.sendUnaryData<GetProductResponse>): Promise<void> {
        try {
            const request = call.request
            let response: GetProductResponse = {
                success: false
            }
            
            const isUUIDsValid = request.productIds.every((value) => validate(value))
            if (!isUUIDsValid) {
                callback(null, response)
                return
            }
            const productString = `SELECT COUNT(uuid) FROM product.products WHERE uuid IN ('${request.productIds.join("','")}') AND deleted_at IS NULL;`

            const row = await this.postgresInfra.dbReadPool.manyOrNone(productString)

            
            if (Number(row[0].count) !== request.productIds.length) {
                callback(null, response)
                return
            }

            response.success = true
            callback(null, response)
            return

        } catch (error) {
            throw error
        }
    }
}