import express from "express";
import { upload } from "../utils/upload.js";
import { uploadResume } from "../controllers/resumeUploadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload",protect, upload.single("resume"), uploadResume);


export default router;

