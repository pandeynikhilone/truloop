import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import reviewRoutes from "./routes/review.routes.js";

import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("TruLoop API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

export default app;
