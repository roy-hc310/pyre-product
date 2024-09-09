
import { ProductService } from "../feature-product/v1/service/product-service";
import { ProductController } from "../feature-product/v1/controller/product-controller";
import { PostgresInfrastructure } from "../core-internal/infrastructure/postgres";




export class Application {

    postgresInfra: PostgresInfrastructure

    productService: ProductService
    productController: ProductController

    constructor() {

        this.postgresInfra = new PostgresInfrastructure()

        this.productService = new ProductService(this.postgresInfra)
        this.productController = new ProductController(this.productService)
    }
}