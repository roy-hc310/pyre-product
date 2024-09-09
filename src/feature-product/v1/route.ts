import { Application as ExpressApplication } from "express";
import { ProductController } from "./controller/product-controller";



export const ProductRoute = (e: ExpressApplication, productController: ProductController, path: string) => {
        
    // e.post(`${path}/v1`, productController.CreateProduct)
    e.route(`${path}/v1`).post(productController.CreateProduct.bind(productController))
    e.route(`${path}/v1/:id`).get(productController.DetailProduct.bind(productController))
    e.route(`${path}/v1/:id`).put(productController.UpdateProduct.bind(productController))
    e.route(`${path}/v1`).get(productController.ListProducts.bind(productController))
    e.route(`${path}/v1/:id`).delete(productController.DeleteProduct.bind(productController))
}