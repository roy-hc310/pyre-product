


export interface CoreQuery {
    page?: string
    size?: string

    sort?: string
    search?: string
    cursor?: string
    shop_id?: string
}

export interface CoreResponseObject<T> {
    data: T
    succeed: boolean
    errors: string[]
}

export interface CoreResponseList<T> extends CoreResponseObject<T[]> {
    totalItems: number
}

