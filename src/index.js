import express from "express";
import dbConfig from "./configurations/dbConfig.js";
import "dotenv/config.js";
import cors from "cors";
import { swaggerDocs, swaggerUi } from "./configurations/swaggerConfig.js";
import { corsOptions } from "./static/constant.js";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { startAllJobs } from "./utils/cron.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const httpServer = createServer(app);

app.use(cors(corsOptions));
app.use(express.json({ limit: "1000mb" }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

startAllJobs();

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
dbConfig();
