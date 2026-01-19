import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import reviewRoutes from "./routes/review.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TruLoop API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

export default app;
