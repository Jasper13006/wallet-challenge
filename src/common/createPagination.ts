
export const createPagination = (items:any,limit:number, offset:number, totalItems:number) =>{
    return {
        items,
        totalItems,
        limit,
        offset
    }
}