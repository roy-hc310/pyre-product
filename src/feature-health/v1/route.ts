import { Application as ExpressApplication } from "express";
import { HealthController } from "./controller/health-controller";



export const HealthRoute = (e: ExpressApplication, productController: HealthController, path: string) => {
        
    e.route(`${path}/v1`).get(productController.Health.bind(productController))
}