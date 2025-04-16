import { Package } from "../models/index.js";

export async function getPackages(db_query, limit) {

    const packagesQuery = Package.find( db_query ? { ...db_query } : {} ).lean()
        .populate("makkahHotel")
        .populate("madinahHotel");
    if (limit > 0) {
        return await packagesQuery.limit(limit).exec();
    } else {
        return await packagesQuery.exec();
    }

}

export async function updatePackages(db_query, update) {

    const updatedPackages = await Package.updateMany( 
        db_query ? { ...db_query } : {}, 
        { ...update }).lean();

    return updatedPackages;
}