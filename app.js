import express from "express";
import { PORT } from "./config/env.js";
import connectDb from "./db/connect.js";
import packagesRouter from "./routes/packages.routes.js";
import hotelsRouter from "./routes/hotels.routes.js";
import indexRouter from "./routes/index.routes.js";

const app = express();

// settings
app.set('public', 'public');

// middlewares
app.use(express.json());

// routers
app.use('/', indexRouter);
app.use('/api/v1/packages', packagesRouter);
app.use('/api/v1/hotels', hotelsRouter);

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running on port ${PORT}. http://localhost:${PORT}`);
})
