import express from "express";
import multer from "multer";
import { downloadFile, uploadFile } from "../services/mediaService.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/download/:folder/:fileName", downloadFile);

export { router as mediaRouter };
