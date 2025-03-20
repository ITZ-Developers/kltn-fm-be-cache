import "dotenv/config.js";

const DATE_FORMAT = "DD/MM/YYYY HH:mm:ss";

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-API-Key", "X-tenant"],
};

const SERVER_PORT = process.env.PORT;

const CACHE_API_KEY = process.env.X_API_KEY;

const JWT_SECRET_KEY = process.env.JWT_SECRET;

const APP_URL = process.env.URL;

const CACHE_TTL = 2592000000; // 30 days
const CACHE_MAX_SIZE = 10000;

export {
  corsOptions,
  JWT_SECRET_KEY,
  DATE_FORMAT,
  APP_URL,
  CACHE_TTL,
  CACHE_MAX_SIZE,
  SERVER_PORT,
  CACHE_API_KEY,
};
