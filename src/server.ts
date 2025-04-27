if (process.env.NODE_ENV === "production") {
  require("module-alias/register");
}
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongoDB } from "@/config/database";
import imageRoutes from "@/routes/image.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

app.use(
  cors({
    origin: "https://devdiff-client.vercel.app/",
    methods: ["GET", "POST", "OPTIONS"],
  })
);

// Routes
app.use("/api/images", imageRoutes);

app.use("/", (_, res) => {
  res.send("Server is running successfully!");
});

// Start server
connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
