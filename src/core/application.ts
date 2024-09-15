
import { ProductService } from "../feature-product/v1/service/product-service";
import { ProductController } from "../feature-product/v1/controller/product-controller";
import { PostgresInfrastructure } from "../core-internal/infrastructure/postgres";
import { HealthService } from "../feature-health/v1/service/health-service";
import { HealthController } from "../feature-health/v1/controller/health-controller";




export class Application {

    postgresInfra: PostgresInfrastructure

    healthService: HealthService
    healthController: HealthController

    productService: ProductService
    productController: ProductController

    constructor() {

        this.postgresInfra = new PostgresInfrastructure()

        this.healthService = new HealthService()
        this.healthController = new HealthController(this.healthService)

        this.productService = new ProductService(this.postgresInfra)
        this.productController = new ProductController(this.productService)
    }
}