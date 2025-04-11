import { Router } from "express";
import { Hotel } from '../models/index.js';

const hotelsRouter = Router();

// route to get all hotels
hotelsRouter.get("/", async (req, res) => {
    const hotels = await Hotel.find({}).lean();
    res.json({
        hotels,
    });
});

// route to add hotels in bulk
hotelsRouter.put("/", async (req, res) => {
    // accepts an array of hotels
    const hotels = req.body.hotels || req.body;

    // checking that hotels is an array
    if (!Array.isArray(hotels)) {
        return res.status(400).json({ message: "Request body should be an array of hotels" });
    }
    // checking that hotels is not empty
    if (hotels.length === 0) {
        return res.status(400).json({ message: "Hotels array should not be empty" });
    }
    const errors = [];
    hotels.forEach( async (hotel) => {
        // checking if hotel already exists
        const existingHotel = await Hotel.findOne({ name: hotel.name });
        // if does not already exist, create a new hotel
        if (!existingHotel) {
            try {
                const newHotel = new Hotel(hotel);
                await newHotel.save();
            } catch (error) {
                console.error(error);
                errors.push({ hotel, error: error.message });
            }
        }
    })
    if (errors.length > 0) {
        return res.status(400).json({ message: "Some hotels could not be created", errors });
    }
    res.json({
        message: `${hotels.length} hotels added successfully`,
    });
})

export default hotelsRouter;