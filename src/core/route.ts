import { Application as ExpressApplication } from "express";
import { Application } from "./application";
import { ProductRoute } from "../feature-product/v1/route";


export const Router = (e: ExpressApplication, application: Application) => {
        
    const route = '/api'

    const productRoute = `${route}/products`
    ProductRoute(e, application.productController, productRoute)
}