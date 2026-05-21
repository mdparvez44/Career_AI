import express from "express";

import {
    fetchJobs,
    getJobs,
} from "../controllers/jobController.js";

const router = express.Router();

router.get("/fetch", fetchJobs);

router.get("/", getJobs);

export default router;