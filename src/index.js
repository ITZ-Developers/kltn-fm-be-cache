import express from "express";
import cors from "cors";
import { swaggerDocs, swaggerUi } from "./config/swaggerConfig.js";
import { corsOptions, SERVER_PORT } from "./static/constant.js";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { startAllJobs } from "./utils/cron.js";
import { cacheRouter } from "./routes/cacheRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const httpServer = createServer(app);

app.use(cors(corsOptions));
app.use(express.json({ limit: "1000mb" }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/v1/cache", cacheRouter);

app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

startAllJobs();

const PORT = SERVER_PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
