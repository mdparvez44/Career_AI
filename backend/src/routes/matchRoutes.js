import express from "express";
import { generateMatches, getMyMatches } from "../controllers/matchController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// generate AI matches
router.post("/generate", protect, generateMatches);
router.get("/me", protect, getMyMatches);

export default router;