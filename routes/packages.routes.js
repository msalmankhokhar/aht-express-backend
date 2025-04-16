import { Router } from "express";
import { Package, Hotel } from "../models/index.js";
import { getPackages, updatePackages } from "../controllers/packages.controllers.js";

const packagesRouter = Router();

// fetch all packages
packagesRouter.get("/", async (req, res) => {
  const db_query = req.body?.db_query;
  const limit = req.body?.limit;
  const packages = await getPackages(db_query, limit);
  res.json({
    packages,
    total_results: packages.length,
    message: "Packages retrieved successfully",
    db_query,
  });
});

// update packages
packagesRouter.patch("/", async (req, res) => {
  const db_query = req.body?.db_query;
  const update = req.body?.update;
  try {
    const updatedPackages = await updatePackages(db_query, update);
    if (updatedPackages.matchedCount === 0) {
      return res.status(404).json({ message: "No packages found" });
    }
    return res.json({
      message: `${updatedPackages.modifiedCount} packages updated successfully`,
      updatedPackages: updatedPackages,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// add packages in bulk
packagesRouter.post("/", async (req, res) => {
  // accepts an array of packages
  const packages = req.body?.packages || req.body;
  // checking that packages is an array
  if (!Array.isArray(packages)) {
    return res.status(400).json({ message: "Request body should be an array of packages" });
  }
  // checking that packages is not empty
  if (packages.length === 0) {
    return res.status(400).json({ message: "Packages array should not be empty" });
  }

  const errors = [];

  for (const pkg of packages) {
    // checking if package already exists
    const existingPackage = await Package.findOne({ title: pkg.title });
    // if does not already exist, create a new package
    if (!existingPackage) {
      try {
        // checking if hotel exists
        const { makkahHotel, madinahHotel } = pkg;
        console.log(makkahHotel, madinahHotel);
        const newPackage = new Package(pkg);
        // processing makkah hotel
        const existingMakkahHotel = await Hotel.findOne(makkahHotel);
        if (!existingMakkahHotel) {
          const newMakkahHotel = new Hotel(makkahHotel);
          await newMakkahHotel.save();
          newPackage.makkahHotel = newMakkahHotel._id;
        } else {
          newPackage.makkahHotel = existingMakkahHotel._id;
        }
        // prcessing madinah hotel
        const existingMadinahHotel = await Hotel.findOne(madinahHotel);
        if (!existingMadinahHotel) {
          const newMadinahHotel = new Hotel(madinahHotel);
          await newMadinahHotel.save();
          newPackage.madinahHotel = newMadinahHotel._id;
        } else {
          newPackage.madinahHotel = existingMadinahHotel._id;
        }
        // saving the package
        await newPackage.save();
      } catch (error) {
        errors.push({ pkg, error: error.message });
      }
    }
  }

  if (errors.length === 0) {
    return res.json({
      message: `Packages added successfully`,
    });
  } else {
    return res.status(400).json({ message: "Some packages could not be created", errors });
  }
})

export default packagesRouter;