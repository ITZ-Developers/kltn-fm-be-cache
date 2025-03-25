import { ENV } from "../static/constant.js";
import { decrypt, encrypt } from "../utils/utils.js";
import { makeErrorResponse, makeSuccessResponse } from "./apiService.js";
import fs from "fs";
import path from "path";

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return makeErrorResponse({ res, message: "No file uploaded" });
    }
    if (!ENV.UPLOAD_DIR || !ENV.MEDIA_SECRET) {
      return makeErrorResponse({ res, message: "Server configuration error" });
    }

    const folder = Date.now().toString();
    const fileName = req.file.originalname;
    const folderPath = path.join(ENV.UPLOAD_DIR, folder);
    const filePath = path.join(folderPath, fileName);
    const relativePath = path.join(folder, fileName);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const encryptedData = encrypt(
      req.file.buffer.toString("base64"),
      ENV.MEDIA_SECRET
    );
    await fs.promises.writeFile(filePath, encryptedData, "utf8");

    return makeSuccessResponse({
      res,
      message: "File uploaded successfully",
      data: { filePath: relativePath },
    });
  } catch (error) {
    return makeErrorResponse({ res, message: error.message });
  }
};

const downloadFile = async (req, res) => {
  try {
    const folderName = req.params.folder;
    const fileName = req.params.fileName;
    if (!ENV.UPLOAD_DIR || !ENV.MEDIA_SECRET) {
      return makeErrorResponse({ res, message: "Server configuration error" });
    }

    const filePath = path.join(ENV.UPLOAD_DIR, folderName, fileName);

    if (!fs.existsSync(filePath)) {
      return makeErrorResponse({ res, message: "File not found" });
    }

    const encryptedData = fs.readFileSync(filePath, "utf8");
    const decryptedData = decrypt(encryptedData, ENV.MEDIA_SECRET);
    const fileBuffer = Buffer.from(decryptedData, "base64");

    const ext = path.extname(fileName).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".mp4") contentType = "video/mp4";
    else if (ext === ".m3u8") contentType = "application/x-mpegURL";
    else if (ext === ".ts") contentType = "video/mp2t";

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);
    res.send(fileBuffer);
  } catch (error) {
    return makeErrorResponse({ res, message: error.message });
  }
};

export { uploadFile, downloadFile };
