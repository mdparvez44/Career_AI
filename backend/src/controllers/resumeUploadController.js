import { createRequire } from "module";
import fs from "fs";
import Resume from "../models/Resume.js";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

import mammoth from "mammoth";
import { analyzeResumeWithAI } from "../services/aiservices.js";

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file Uploaded"
            });
        }

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user"
            });
        }

        const filePath = req.file.path;
        const ext = req.file.originalname.split(".").pop();

        let extractedText = "";

        // PDF
        if (ext === "pdf") {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdfParse(dataBuffer);
            extractedText = data.text;
        }

        // DOCX
        else if (ext === "docx") {
            const data = await mammoth.extractRawText({ path: filePath });
            extractedText = data.value;
        }

        if (!extractedText || extractedText.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Could not extract text from resume"
            });
        }

        const aiResponse = await analyzeResumeWithAI(extractedText);

        const savedResume = await Resume.create({
            user: req.user._id,
            filePath: req.file.path,
            extractedText,
            skills: aiResponse.skills || [],
            technologies: aiResponse.technologies || [],
            experience_level: aiResponse.experience_level || "unknown",
            suggested_job_roles: aiResponse.suggested_job_roles || [],
        });

        return res.status(200).json({
            success: true,
            resume: savedResume,
        });

    } catch (error) {
        console.log("UPLOAD ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};