import { Application as ExpressApplication } from "express";
import { ProductController } from "./controller/product-controller";
import { Middleware } from "../../core-internal/utils/middleware";



export const ProductRoute = (e: ExpressApplication, productController: ProductController, path: string) => {
        
    e.route(`${path}/v1`).post(Middleware, productController.CreateProduct.bind(productController))
    e.route(`${path}/v1/:id`).get(Middleware, productController.DetailProduct.bind(productController))
    e.route(`${path}/v1/:id`).put(Middleware, productController.UpdateProduct.bind(productController))
    e.route(`${path}/v1`).get(Middleware, productController.ListProducts.bind(productController))
    e.route(`${path}/v1/:id`).delete(Middleware, productController.DeleteProduct.bind(productController))
}