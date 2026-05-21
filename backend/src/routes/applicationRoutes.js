import express from "express";

import {
    autoApplyJob
}
from "../controllers/applicationController.js";

import {
    protect
}
from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/auto-apply",
    protect,
    autoApplyJob
);

export default router;