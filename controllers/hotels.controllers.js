import { Hotel } from "../models/index.js";

export async function getHotels(db_query, limit) {

    const hotelsQuery = Hotel.find( db_query ? { ...db_query } : {} ).lean()
    if (limit > 0) {
        return await hotelsQuery.limit(limit).exec();
    } else {
        return await hotelsQuery.exec();
    }

}

export async function updateHotels(db_query, update) {

    const updatedHotels = await Hotel.updateMany( 
        db_query ? { ...db_query } : {}, 
        { ...update }).lean();

    return updatedHotels;
}