import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json()); // body -> req.body

// Adım 4 · Health-check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501027",
  });
});

app.use("/events", eventRoutes);

// Eşleşme yoksa 404
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// Adım 8 · Hata yakalayıcı middleware (4 parametre)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: { message: "Server error" } });
});

export default app;
