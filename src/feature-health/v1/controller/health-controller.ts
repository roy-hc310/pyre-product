import { Request, Response } from "express";
import { HealthService } from "../service/health-service";
import { CoreResponseObject } from "../../../core-internal/model/core-model";
import { HealthResponse } from "../model/health-response";


export class HealthController {
    healthService: HealthService
    constructor(healthServicee: HealthService) {
        this.healthService = healthServicee
    }

    async Health(req: Request, res: Response): Promise<void> {
        try {

            const data = await this.healthService.Health()

            const response: CoreResponseObject<HealthResponse> = {
                data: data,
                succeed: true,
                errors: []
            }
            res.status(200).json(response)
        } catch (error) {
            const err = error as Error
            const errResponse: CoreResponseObject<null> = {
                data: null,
                succeed: false,
                errors: [err.message]
            }
            res.status(500).json(errResponse)
        }
    }
}