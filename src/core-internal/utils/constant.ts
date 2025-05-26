


export const XShopId = "x-shop-id"
export const XLanguage = "x-language"

export const DefaultPage = "1"
export const DefaultSize = "10"
export const DefaultOrder = "id DESC"





export const ProductTableName = "product.products"
export const VariantTableName = "product.variants"

export const ProductColumnListForInsert: string[] = ["uuid", "name", "sku", "shop_id", "description", "active", "brand", "category", "images", "video", "status"]
export const VariantColumnListForInsert: string[] = ["uuid", "product_id", "name", "sku", "variant_type", "price", "active", "stock", "image", "weight", "height", "width", "length"]

export const ProductColumnListForUpdate: string[] = ["name", "sku", "description", "active", "brand", "category", "images", "video", "status"]

export const ProductColumnListForSelect: string[] = ["id", "created_at", "updated_at", "deleted_at", "uuid", "name", "sku", "shop_id", "description", "active", "brand", "category", "images", "video", "status"]
export const VariantColumnListForSelect: string[] = ["uuid", "product_id", "name", "sku", "variant_type", "price", "active", "stock", "image", "weight", "height", "width", "length"]