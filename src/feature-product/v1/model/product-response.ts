import { Variant } from "./product-request"


export interface ProductIdResponse {
    id: string
}

export interface ProductResponse {
    id?: string
    created_at?: Date
    updated_at?: Date
    deleted_at?: Date
    uuid?: string
    name?: string
    sku?: string
    shop_id?: string
    description?: string
    active?: boolean
    brand?: string
    category?: string
    images?: string[]
    video?: string
    status?: string
    variants?: Variant[]
}