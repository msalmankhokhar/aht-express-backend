import express from "express";
import { PORT } from "./config/env.js";
import packagesRouter from "./routes/packages.routes.js";
import connectDb from "./db/connect.js";
import hotelsRouter from "./routes/hotels.routes.js";

const app = express();

// settings
app.set('public', 'public');

// middlewares
app.use(express.json());

// routers
app.use('/api/v1/packages', packagesRouter);
app.use('/api/v1/hotels', hotelsRouter);

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running on port ${PORT}. http://localhost:${PORT}`);
})
