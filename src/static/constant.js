import "dotenv/config.js";

const DATE_FORMAT = "DD/MM/YYYY HH:mm:ss";

const PhonePattern = /^0[35789][0-9]{8}$/;

const EmailPattern =
  /^(?!.*[.]{2,})[a-zA-Z0-9.%]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-API-Key", "X-tenant"],
};

const SERVER_SECRET_KEY = process.env.SERVER_SECRET;

const JWT_SECRET_KEY = process.env.JWT_SECRET;

const INSIGHT_PASSWORD = process.env.CACHE_INSIGHT_PASSWORD;

const APP_URL = process.env.URL;

export {
  SERVER_SECRET_KEY,
  PhonePattern,
  EmailPattern,
  corsOptions,
  JWT_SECRET_KEY,
  DATE_FORMAT,
  INSIGHT_PASSWORD,
  APP_URL,
};
