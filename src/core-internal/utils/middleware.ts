import { NextFunction, Request, Response } from "express"
import { XShopId } from "./constant"


export function Middleware(req: Request, res: Response, next: NextFunction) {
    const shopId: string = req.get(XShopId) as string
    // const language: string = req.get("x-language") as string
    if (!shopId) {
        res.status(400).json({
            message: "x-shop-id is required"
        })
        return
    }
    res.set(XShopId, shopId)

    next()
}