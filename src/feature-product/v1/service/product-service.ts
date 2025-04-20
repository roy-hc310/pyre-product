import { ElasticSearchInfrastructure } from "../../../core-internal/infrastructure/elastic-search";
import { PostgresInfrastructure } from "../../../core-internal/infrastructure/postgres";
import { CoreQuery } from "../../../core-internal/model/core-model";
import { PrepareInsertQuery, PrepareSelectQuery, PrepareUpdateQuery } from "../../../core-internal/utils/common";
import { DefaultOrder, DefaultSize, ProductColumnListForInsert, ProductColumnListForSelect, ProductColumnListForUpdate, ProductTableName, VariantColumnListForInsert, VariantColumnListForSelect, VariantTableName } from "../../../core-internal/utils/constant";
import { ProductRequest, Variant } from "../model/product-request";
import { ProductIdResponse, ProductResponse } from "../model/product-response";
import { v4 } from 'uuid';





export class ProductService {
    postgresInfra: PostgresInfrastructure
    elasticSearchInfra: ElasticSearchInfrastructure
    constructor(postgresInfra: PostgresInfrastructure, elasticSearchInfra: ElasticSearchInfrastructure) {
        this.postgresInfra = postgresInfra
        this.elasticSearchInfra = elasticSearchInfra
    }

    async CreateProduct(data: ProductRequest): Promise<ProductIdResponse> {
        try {
            const productUUID: string = v4()

            await this.postgresInfra.dbWritePool.tx(async t => {

                const productsInterface: any[][] = [
                    [ productUUID, data.name, data.sku, data.shop_id, data.description, data.active, data.brand, data.category, JSON.stringify(data.images), data.video, data.status]
                ]

                const productString = PrepareInsertQuery(ProductTableName, ProductColumnListForInsert, productsInterface)

                let productParams: any[] = []
                for (let i = 0; i < productsInterface.length; i++) {
                    productParams.push(...productsInterface[i])
                }

                await t.none(productString, productParams)

                let variantsInterface: any[][] = []

                for (let i = 0; i < data.variants.length; i++) {
                    const variantUUID: string = v4()

                    const variantInterface: any[] = [
                        variantUUID,
                        productUUID,
                        data.variants[i].name,
                        data.variants[i].sku,
                        data.variants[i].variant_type,
                        data.variants[i].price,
                        data.variants[i].active,
                        data.variants[i].stock,
                        data.variants[i].image,
                        data.variants[i].weight,
                        data.variants[i].height,
                        data.variants[i].width,
                        data.variants[i].length,
                    ]

                    variantsInterface.push(variantInterface)
                }

                const variantString = PrepareInsertQuery(VariantTableName, VariantColumnListForInsert, variantsInterface)

                let variantParams: any[] = []
                for (let i = 0; i < variantsInterface.length; i++) {
                    variantParams.push(...variantsInterface[i])
                }

                await t.none(variantString, variantParams)
            })

            console.log(this.elasticSearchInfra.client.info())

            let elasticSearchData: ProductResponse = {}
            elasticSearchData = {...data}
            elasticSearchData.uuid = productUUID
            await this.elasticSearchInfra.client.index({ 
                index: "products", 
                id: productUUID,
                body: elasticSearchData 
            })
            await this.elasticSearchInfra.client.indices.refresh({index: 'products'})

            const res: ProductIdResponse = { 
                id: productUUID 
            }

            return res
        } catch (error) {
            throw error
        }
        
    }

    async DetailProduct(id: string): Promise<ProductResponse> {
        try {

            let response: ProductResponse = { id: '', created_at: new Date(), updated_at: new Date(), deleted_at: new Date(), uuid: '', name: '', sku: '', shop_id: '', description: '', active: true, brand: '', category: '', images: [], video: '', status: '', variants: [],}

            const productString = `SELECT p.id, p.created_at, p.updated_at, p.deleted_at, p.uuid, p.name, p.sku, p.shop_id, p.description, p.active, p.brand, p.category, p.images, p.video, p.status, v.id AS variant_id, v.uuid AS variant_uuid, v.product_id AS product_id, v.name AS variant_name, v.sku AS variant_sku, v.variant_type, v.price, v.active AS variant_active, v.stock, v.image AS variant_image, v.weight, v.height, v.width, v.length FROM product.products p LEFT JOIN product.variants v on p.uuid = v.product_id WHERE p.uuid = $1 AND p.deleted_at IS NULL;`

            const rows = await this.postgresInfra.dbReadPool.manyOrNone(productString, id)
            if (rows.length === 0) {
                return null
            }
            const mapProductIdVariants: Map<string, Variant[]> = new Map()
            for (let i = 0; i < rows.length; i++) {
                if (!mapProductIdVariants.has(rows[i].product_id)) {
                    mapProductIdVariants.set(rows[i].product_id, [])
                }
                const variant: Variant = {
                    name: rows[i].variant_name,
                    sku: rows[i].variant_sku,
                    variant_type: rows[i].variant_type,
                    price: rows[i].price,
                    active: rows[i].variant_active,
                    stock: rows[i].stock,
                    image: rows[i].variant_image,
                    weight: rows[i].weight,
                    height: rows[i].height,
                    width: rows[i].width,
                    length: rows[i].length
                }

                mapProductIdVariants.get(rows[i].product_id)!.push(variant)
                // const variants = mapProductIdVariants.get(rows[i].product_id);
                // if (variants) {
                //     variants.push(rawProductVariant);
                // }

                if (response.uuid === '') {
                    response = {
                        id: rows[i].uuid,
                        created_at: rows[i].created_at,
                        updated_at: rows[i].updated_at,
                        deleted_at: rows[i].deleted_at,
                        uuid: rows[i].uuid,
                        name: rows[i].name,
                        sku: rows[i].sku,
                        shop_id: rows[i].shop_id,
                        description: rows[i].description,
                        active: rows[i].active,
                        brand: rows[i].brand,
                        category: rows[i].category,
                        images: rows[i].images,
                        video: rows[i].video,
                        status: rows[i].status,
                        variants: []
                    }
                }
            }

            const variants = mapProductIdVariants.get(response.uuid)
            if (variants) {
                response.variants = variants
            }
            
            return response
        } catch (error) {
            throw error
        }
    }

    async UpdateProduct(id: string, data: ProductRequest): Promise<ProductIdResponse> {

        await this.postgresInfra.dbWritePool.tx(async t => {
            const productInterface: any[] = [ data.name, data.sku, data.description, data.active, data.brand, data.category, JSON.stringify(data.images), data.video, data.status, id]

            const productString = PrepareUpdateQuery(ProductTableName, ProductColumnListForUpdate)

            await t.none(productString, productInterface)

            await t.none("DELETE FROM product.variants WHERE product_id = $1", id)

            let variantsInterface: any[][] = []

            for (let i = 0; i < data.variants.length; i++) {
                const variantUUID: string = v4()

                const variantInterface: any[] = [
                    variantUUID,
                    id,
                    data.variants[i].name,
                    data.variants[i].sku,
                    data.variants[i].variant_type,
                    data.variants[i].price,
                    data.variants[i].active,
                    data.variants[i].stock,
                    data.variants[i].image,
                    data.variants[i].weight,    
                    data.variants[i].height,
                    data.variants[i].width,
                    data.variants[i].length
                ]

                variantsInterface.push(variantInterface)
            }

            const variantString = PrepareInsertQuery(VariantTableName, VariantColumnListForInsert, variantsInterface)

            let variantsParams: any[] = []
            for (let i = 0; i < variantsInterface.length; i++) {
                variantsParams.push(...variantsInterface[i])
            }

            await t.none(variantString, variantsParams)
        })

        const res: ProductIdResponse = {
            id: id
        }
        return res
    }

    async ListProducts(query: CoreQuery): Promise<ProductResponse[]> {
        try {
            let intVariables: number = 0
            let productInterface: any[] = []
            let productString = PrepareSelectQuery(ProductTableName, ProductColumnListForSelect)

            if (query.shop_id) {
                intVariables++
                productString += `AND shop_id = $${intVariables} `
                productInterface.push(query.shop_id)
            }

            if (query.cursor) {
                intVariables++
                productString += `AND id < $${intVariables} `
                productInterface.push(query.cursor)
            }
            
            if (query.sort) {
                productString += `ORDER BY ${query.sort} `
            } else {
                productString += `ORDER BY ${DefaultOrder} `
            }

            if (query.search) {
                const esQuery = {
                    index: "products",
                    body: {
                        query: {
                            match: {
                                name: query.search
                            }
                        }
                    },
                    size: query.size ? query.size : DefaultSize,
                    sort: query.sort ? query.sort : DefaultOrder,
                    from: query.cursor ? Number(query.cursor) : 0
                }
                const esResponse = await this.elasticSearchInfra.client.search(esQuery)
                if (esResponse.hits.total === 0) {
                    return esResponse.hits.hits.map(hit => hit._source) as ProductResponse[]
                }
            }

            if (query.size) {
                productString += `LIMIT ${query.size};`
            } else {
                productString += `LIMIT ${DefaultSize};`
            }

            const products = await this.postgresInfra.dbReadPool.manyOrNone(productString, productInterface) as ProductResponse[]
            

            let productsId: string[] = []
            for (let i = 0; i < products.length; i++) {
                if (products[i].uuid) {
                    productsId.push(products[i].uuid)
                }
            }

            if (productsId.length === 0) {
                return []
            }

            let variantString = PrepareSelectQuery(VariantTableName, VariantColumnListForSelect)
            variantString += ` AND product_id IN ('${productsId.join("','")}')`

            const variants = await this.postgresInfra.dbReadPool.manyOrNone(variantString)

            let mapProductIdVariants = new Map<string, Variant[]>()

            for (let i = 0; i < variants.length; i++) {
                if (!mapProductIdVariants.has(variants[i].product_id)) {
                    mapProductIdVariants.set(variants[i].product_id, [])
                }
                const variant: Variant = {
                    name: variants[i].name,
                    sku: variants[i].sku,
                    variant_type: variants[i].variant_type,
                    price: variants[i].price,
                    active: variants[i].active,
                    stock: variants[i].stock,
                    image: variants[i].image,
                    weight: variants[i].weight,
                    height: variants[i].height,
                    width: variants[i].width,
                    length: variants[i].length
                }

                mapProductIdVariants.get(variants[i].product_id)!.push(variant)
            }

            for (let i = 0; i < products.length; i++) {
                products[i].variants = mapProductIdVariants.get(products[i].uuid)
            }


            return products
        } catch (error) {
            throw error
        }
    }

    async DeleteProduct(id: string): Promise<ProductIdResponse> {
        try {
            const queryString = `UPDATE ${ProductTableName} SET deleted_at = now() WHERE uuid = $1;`
            await this.postgresInfra.dbWritePool.none(queryString, id)
            const res: ProductIdResponse = {
                id: id
            }
            return res
        } catch (error) {
            throw error
        }
    }
}