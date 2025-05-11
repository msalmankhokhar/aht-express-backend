import { Router } from "express";
import { Hotel } from '../models/index.js';
import { getHotels, updateHotels } from "../controllers/hotels.controllers.js";

const hotelsRouter = Router();

// fetch all hotels
hotelsRouter.get("/", async (req, res) => {
  const db_query = req.body?.db_query;
  const limit = req.body?.limit;
  console.log(req.body);
  const hotels = await getHotels(db_query, limit);
  res.json({
    hotels,
    total_results: hotels.length,
    message: "Hotels retrieved successfully",
    db_query,
  });
});

// update hotels
hotelsRouter.patch("/", async (req, res) => {
  const db_query = req.body?.db_query;
  const update = req.body?.update;
  try {
    const updatedHotels = await updateHotels(db_query, update);
    if (updateHotels.matchedCount === 0) {
      return res.status(404).json({ message: "No hotels found" });
    }
    return res.json({
      message: `${updateHotels.modifiedCount} hotels updated successfully`,
      updateHotels: updatedHotels,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
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