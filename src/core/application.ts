
import { ProductService } from "../feature-product/v1/service/product-service";
import { ProductController } from "../feature-product/v1/controller/product-controller";
import { PostgresInfrastructure } from "../core-internal/infrastructure/postgres";
import { HealthService } from "../feature-health/v1/service/health-service";
import { HealthController } from "../feature-health/v1/controller/health-controller";
import { ProductGrpcService } from "../feature-product/v1/service/product-grpc-service";
import { ElasticSearchInfrastructure } from "../core-internal/infrastructure/elastic-search";




export class Application {

    
    elasticSearchInfra: ElasticSearchInfrastructure
    postgresInfra: PostgresInfrastructure

    healthService: HealthService
    healthController: HealthController

    productGrpcService: ProductGrpcService
    productService: ProductService
    productController: ProductController

    constructor() {

        
        this.elasticSearchInfra = new ElasticSearchInfrastructure()
        this.postgresInfra = new PostgresInfrastructure()

        this.healthService = new HealthService()
        this.healthController = new HealthController(this.healthService)

        this.productGrpcService = new ProductGrpcService(this.postgresInfra, this.elasticSearchInfra)
        this.productService = new ProductService(this.postgresInfra, this.elasticSearchInfra)
        this.productController = new ProductController(this.productService)
    }
}