import express from "express";
import multer from "multer";
import { downloadFile, uploadFile } from "../services/mediaService.js";
import { ENV } from "../static/constant.js";
import fs from "fs";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = Date.now().toString();
    const folderPath = path.join(ENV.UPLOAD_DIR, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    req.uploadFolder = folder;
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/download/:folder/:fileName", downloadFile);

export { router as mediaRouter };
