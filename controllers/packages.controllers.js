import { Package } from "../models/index.js";

export async function getPackages(db_query, limit) {

    const packagesQuery = Package.find(db_query ? { ...db_query } : {}).lean()
        .populate("makkahHotel")
        .populate("madinahHotel");
    if (limit > 0) {
        return await packagesQuery.limit(limit).exec();
    } else {
        return await packagesQuery.exec();
    }

}

export async function getPackageById(packageID) {

    const pkg = await Package.findById(packageID).lean()
        .populate("makkahHotel")
        .populate("madinahHotel");
    return pkg;
}

export async function getPackageBySlug(slug) {

    function slugToTitle(slug) {
        return slug
            .replace(/-/g, ' ')               // replace hyphens with spaces
            .replace(/\b\w/g, char => char.toUpperCase()); // capitalize each word
    }

    const title = slugToTitle(slug);

    const pkg = await Package.findOne({title}).lean()
        .populate("makkahHotel")
        .populate("madinahHotel");
    return pkg;
}

export async function updatePackages(db_query, update) {

    const updatedPackages = await Package.updateMany(
        db_query ? { ...db_query } : {},
        { ...update }).lean();

    return updatedPackages;
}