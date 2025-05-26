


export interface CoreQuery {
    page?: string
    size?: string
    cursor?: string

    sort?: string
    search?: string
    shop_id?: string
}

export interface CoreResponseObject<T> {
    data: T
    succeed: boolean
    errors: string[]
}

export interface Pagination {
    page: string | null
    size: string | null
    total_items: string | null
    next_cursor: number | null
}

export interface CoreResponseList<T> extends CoreResponseObject<T>, Pagination {
    
}

