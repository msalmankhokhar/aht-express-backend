import mongoose from "mongoose";
import { accomTypes, packageCategories } from "../../constants/enum.js";

const PackageSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    rating: { type: Number, required: false },
    description: { type: String, required: false },
    thumbnail: { type: String, required: false },
    purpose: { type: String, required: false, enum: ['Umrah', 'Hajj', 'Ramadan Umrah'], default: 'Umrah' },
    category: { type: String, required: false, enum: packageCategories, default: 'popular' },
    labels: { type: [String], required: false, enum: ['All-Inclusive'], required: false },

    makkahHotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: false },
    madinahHotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: false },

    makkahNights: { type: Number, required: false },
    madinahNights: { type: Number, required: false },

    inclusions: { type: [String], required: false, default: ['Flight', 'Visa', 'Transport', 'Accomodation'] },
    exclusions: { type: [String], required: false, default: ['Meals', 'Insurance'] },

    accomType: { type: String, required: false, enum: accomTypes, default: 'Quad' },

    price: { type: Number, required: false }, // price per person in UK pounds
})

export default PackageSchema;