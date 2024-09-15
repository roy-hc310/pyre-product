import { Application as ExpressApplication } from "express";
import { Application } from "./application";
import { ProductRoute } from "../feature-product/v1/route";
import { HealthRoute } from "../feature-health/v1/route";


export const Router = (e: ExpressApplication, application: Application) => {
    e.route(``).get(application.healthController.Health.bind(application.healthController))
    
    const route = '/api'

    const healthRoute = `${route}/health`
    HealthRoute(e, application.healthController, healthRoute)

    const productRoute = `${route}/products`
    ProductRoute(e, application.productController, productRoute)
}