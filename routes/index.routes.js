import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.json({ message: "AHT Backend" });
});

export default indexRouter;