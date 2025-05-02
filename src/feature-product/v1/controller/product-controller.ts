import { Request, Response } from "express";
import { ProductService } from "../service/product-service";
import { ProductRequest } from "../model/product-request";
import { CoreQuery, CoreResponseObject } from "../../../core-internal/model/core-model";
import { ProductIdResponse, ProductResponse } from "../model/product-response";
import { XShopId } from "../../../core-internal/utils/constant";


export class ProductController {
    private productService: ProductService
    constructor(productServicee: ProductService) {
        this.productService = productServicee
    }

    async CreateProduct(req: Request, res: Response): Promise<void> {
        try {
            const body: ProductRequest = req.body
            body.shop_id = req.get(XShopId) as string
            
            const data = await this.productService.CreateProduct(body)

            const response: CoreResponseObject<ProductIdResponse> = {
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

    async DetailProduct(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id
            const data = await this.productService.DetailProduct(id)

            const response: CoreResponseObject<ProductResponse> = {
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

    async UpdateProduct(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id
            const body: ProductRequest = req.body
            body.shop_id = req.get(XShopId) as string

            const data = await this.productService.UpdateProduct(id, body)

            const response: CoreResponseObject<ProductIdResponse> = {
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

    async ListProducts(req: Request, res: Response): Promise<void> {
        try {
            
            const query: CoreQuery = req.query as CoreQuery
            query.shop_id = req.get(XShopId) as string

            const data = await this.productService.ListProducts(query)
            
            const response: CoreResponseObject<ProductResponse[]> = {
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

    async DeleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id
            const data = await this.productService.DeleteProduct(id)

            const response: CoreResponseObject<ProductIdResponse> = {
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