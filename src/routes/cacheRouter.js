import express from "express";
import {
  putKey,
  getKey,
  removeKey,
  checkSession,
  getKeysByPattern,
  removeKeysByPattern,
  resetCache,
  getAllKeys,
  getMultiKeys,
} from "../services/cacheService.js";
import auth from "../middlewares/authentication.js";
const router = express.Router();

router.post("/put-key", auth(), putKey);
router.delete("/remove-key/:key", auth(), removeKey);
router.get("/get-key/:key", auth(), getKey);
router.post("/check-session", auth(), checkSession);
router.get("/get-key-by-pattern/:pattern", auth(), getKeysByPattern);
router.delete("/remove-key-by-pattern/:pattern", auth(), removeKeysByPattern);
router.delete("/reset", auth(), resetCache);
router.get("/get-all-keys", auth(), getAllKeys);
router.post("/get-multi-key", auth(), getMultiKeys);

export { router as cacheRouter };
