import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import Match from "../models/Match.js";
import { calculateMatchScore } from "../services/matchingEngine.js";

export const getMyMatches = async (req, res) => {
    try {
        const matches = await Match.find({ user: req.user._id })
            .populate("job") // IMPORTANT
            .sort({ match_score: -1 });

        res.status(200).json({
            success: true,
            matches,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const generateMatches = async (req, res) => {
    try {

        console.log("GENERATING MATCHES FOR USER:", req.user._id);

        const resume = await Resume.findOne({
            user: req.user._id,
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        const jobs = await Job.find();

        let matches = [];

        for (const job of jobs) {

            // ✅ SAFETY CHECK ADDED
            const jobSkills = job.skills || [];

            if (jobSkills.length === 0) {
                console.log("SKIPPING JOB (NO SKILLS):", job.title);
                continue;
            }

            const result = calculateMatchScore(
                [
                    ...resume.skills,
                    ...resume.technologies
                ],
                jobSkills
            );

            const savedMatch = await Match.findOneAndUpdate(
                {
                    user: req.user._id,
                    job: job._id,
                },
                {
                    match_score: result.match_score,
                    matched_skills: result.matched_skills,
                    missing_skills: result.missing_skills,
                },
                {
                    upsert: true,
                    new: true,
                }
            );

            matches.push({
                job,
                ...result,
            });
        }

        matches.sort((a, b) => b.match_score - a.match_score);

        res.status(200).json({
            success: true,
            total_matches: matches.length,
            matches,
        });

    } catch (error) {
        console.log("ERROR IN generateMatches:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};