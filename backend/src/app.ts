import express from "express";
import cors from "cors";
import opportunityRoutes from "./routes/opportunityRoutes.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173"
    })
  );

  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api", opportunityRoutes);

  return app;
}