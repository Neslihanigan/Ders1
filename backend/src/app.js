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

// Eşleşmeyen rotalar için 404 yanıtı
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;
