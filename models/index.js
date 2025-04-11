import mongoose from "mongoose";
import HotelSchema from "./schemas/Hotel.schema.js";
import PackageSchema from "./schemas/Package.schema.js";

export const Hotel = mongoose.model("Hotel", HotelSchema);
export const Package = mongoose.model("Package", PackageSchema);