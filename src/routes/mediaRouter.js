import express from "express";
import multer from "multer";
import {
  backupZipFile,
  downloadAllFiles,
  downloadFile,
  uploadFile,
} from "../services/mediaService.js";
import { ENV } from "../static/constant.js";
import fs from "fs";
import path from "path";
import auth from "../middlewares/authentication.js";

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

const storageBackup = multer.diskStorage({
  destination: function (req, file, cb) {
    const tempDir = path.join(ENV.UPLOAD_DIR, `temp_${Date.now()}`);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    req.tempDir = tempDir;
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
const uploadBackup = multer({ storage: storageBackup });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/download/:folder/:fileName", downloadFile);
router.get("/download-backup", auth(), downloadAllFiles);
router.post(
  "/push-backup",
  auth(),
  uploadBackup.single("zipFile"),
  backupZipFile
);

export { router as mediaRouter };
