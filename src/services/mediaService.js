import { ENV, MIME_TYPES } from "../static/constant.js";
import { makeErrorResponse, makeSuccessResponse } from "./apiService.js";
import fs from "fs";
import path from "path";

const uploadFile = async (req, res) => {
  try {
    if (!req.file || !req.uploadFolder) {
      return makeErrorResponse({ res, message: "No file uploaded" });
    }

    const folder = req.uploadFolder;
    const filePath = path.join(ENV.UPLOAD_DIR, folder, req.file.filename);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    fs.renameSync(req.file.path, filePath);

    return makeSuccessResponse({
      res,
      message: "File uploaded successfully",
      data: { filePath: `${folder}/${req.file.filename}` },
    });
  } catch (error) {
    return makeErrorResponse({ res, message: error.message });
  }
};

const downloadFile = async (req, res) => {
  try {
    const folderName = req.params.folder;
    const fileName = req.params.fileName;

    if (!ENV.UPLOAD_DIR) {
      return makeErrorResponse({ res, message: "Server configuration error" });
    }

    const filePath = path.join(ENV.UPLOAD_DIR, folderName, fileName);

    if (!fs.existsSync(filePath)) {
      return makeErrorResponse({ res, message: "File not found" });
    }

    const ext = path.extname(fileName).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);

    readStream.on("error", (err) => {
      return makeErrorResponse({ res, message: err.message });
    });
  } catch (error) {
    return makeErrorResponse({ res, message: error.message });
  }
};

export { uploadFile, downloadFile };
