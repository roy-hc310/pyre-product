


export function PrepareInsertQuery(tableName: string, columnName: string[], productInterface: any[][]): string {
    
    const productLen = productInterface.length
    const fieldLen = productInterface[0].length

    let placeHolders: string[] = []

    for (let i = 0; i < productLen; i++) {
        let recordPlaceHolder: string[] = []
        for (let j = 0; j < fieldLen; j++) {
            recordPlaceHolder.push(`$${i*fieldLen+j+1}`)
        }
        placeHolders.push(`(${recordPlaceHolder.join(", ")})`)
    }
    const finalPlaceHolder = placeHolders.join(", ")

    const queryString = `INSERT INTO ${tableName} (${columnName.join(", ")}) VALUES ${finalPlaceHolder}`
    return queryString
}

export function PrepareUpdateQuery(tableName: string, colunmsName: string[]): string {
    
    let placeHolders: string[] = []
    for (let i = 0; i < colunmsName.length; i++) {
        placeHolders.push(`${colunmsName[i]} = $${i+1}`)
    }
    const finalPlaceHolder = placeHolders.join(", ")

    const queryString = `UPDATE ${tableName} SET ${finalPlaceHolder} WHERE uuid = $${colunmsName.length+1}`
    return queryString
}

export function PrepareSelectQuery(tableName: string, colunmsName: string[]): string {

    const finalPlaceHolder = colunmsName.join(", ")
    const queryString = `SELECT ${finalPlaceHolder} FROM ${tableName} WHERE deleted_at IS NULL `

    return queryString
}

export function PrepareSelectCountQuery(tableName: string): string {
    const queryString = `SELECT COUNT(*) FROM ${tableName} WHERE deleted_at IS NULL `
    return queryString
}