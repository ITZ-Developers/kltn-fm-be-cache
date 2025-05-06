import express from "express";
import cors from "cors";
import { swaggerDocs, swaggerUi } from "./config/swaggerConfig.js";
import { corsOptions, ENV } from "./static/constant.js";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { startAllJobs } from "./utils/cron.js";
import { cacheRouter } from "./routes/cacheRouter.js";
import { mediaRouter } from "./routes/mediaRouter.js";
import { embeddingRouter } from "./routes/embeddingRouter.js";
import dbConfig from "./config/dbConfig.js";
import { Server } from "socket.io";
import { setupSocket } from "./config/socketHandler.js";
import { geminiRouter } from "./routes/geminiRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
});

app.use(cors(corsOptions));
app.use(express.json({ limit: "1000mb" }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/v1/cache", cacheRouter);
app.use("/v1/media", mediaRouter);
app.use("/v1/embedding", embeddingRouter);
app.use("/v1/gemini", geminiRouter);

app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

startAllJobs();

const PORT = ENV.SERVER_PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
dbConfig();
setupSocket(io);

export { io };
