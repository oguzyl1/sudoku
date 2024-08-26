require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/game");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);

app.use((err, req, res, next) => {
  console.error("Genel hata:", err);
  res.status(500).json({ message: "Sunucu hatası oluştu." });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
