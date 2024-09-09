

export interface ProductRequest {
    name: string
    sku: string
    shop_id: string
    description: string
    active: boolean
    brand: string
    category: string
    images: string[]
    video: string
    status: string
    variants: Variant[]
}

export interface Variant{
    name: string
    sku: string
    variant_type: string // color, size, etc
    price: number
    active: boolean
    stock: number
    image: string

    
    weight: number
    height: number
    width: number
    length: number
}