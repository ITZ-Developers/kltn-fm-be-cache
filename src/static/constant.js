import "dotenv/config.js";

const DATE_FORMAT = "DD/MM/YYYY HH:mm:ss";

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-API-Key", "X-tenant"],
};

const ENV = {
  SERVER_PORT: process.env.PORT,
  X_API_KEY: process.env.X_API_KEY,
  APP_URL: process.env.URL,
  MEDIA_SECRET: process.env.MEDIA_SECRET,
  UPLOAD_DIR: process.env.UPLOAD_DIR,
};

const CACHE_TTL = 2592000000; // 30 days
const CACHE_MAX_SIZE = 10000;

export { corsOptions, DATE_FORMAT, ENV, CACHE_TTL, CACHE_MAX_SIZE };
