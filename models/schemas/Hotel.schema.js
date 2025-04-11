import mongoose from "mongoose";
import { hotelCities } from "../../constants/enum.js";

const HotelSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    address: { type: String, required: false },
    city: { type: String, required: false, enum: hotelCities },
    rating: { type: Number, required: false },
    description: { type: String, required: false },
    thumbnail: { type: String, required: false },
    images: { type: [String], required: false },
    distanceFromHaram: { type: Number, required: false }, // distance in meters
})

export default HotelSchema;