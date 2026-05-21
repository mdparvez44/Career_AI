import Job from "../models/Job.js";
import Resume from "../models/Resume.js";
import Application from "../models/Application.js";

import { applyInternshalaJob }
from "../services/automation/internshalaApply.js";

import { applyWellfoundJob }
from "../services/automation/wellfoundApply.js";

import { applyLinkedinJob }
from "../services/automation/linkedinApply.js";

import { applyWorkIndiaJob }
from "../services/automation/workIndiaApply.js";

import { applyUnstopJob }
from "../services/automation/unstopApply.js";

export const autoApplyJob = async (
    req,
    res
) => {

    try {

        const { jobId } = req.body;

        const job =
            await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        const resume =
            await Resume.findOne({
                user: req.user._id,
            });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        let result;

        // INTERN SHALA
        if (job.source === "Internshala") {

            result =
                await applyInternshalaJob({

                    email:
                        process.env.INTERNSHALA_EMAIL,

                    password:
                        process.env.INTERNSHALA_PASSWORD,

                    resumePath:
                        resume.filePath,

                    jobUrl:
                        job.apply_link,
                });
        }
        else if (job.source === "Wellfound") {

            result =
                await applyWellfoundJob({
                    email:
                        process.env.WELLFOUND_EMAIL,

                    password:
                        process.env.WELLFOUND_PASSWORD,

                    resumePath:
                        resume.filePath,

                    jobUrl:
                        job.apply_link,
                });
        }

        else if (job.source === "LinkedIn") {

            result =
                await applyLinkedinJob({
                    email:
                        process.env.LINKEDIN_EMAIL,

                    password:
                        process.env.LINKEDIN_PASSWORD,

                    resumePath:
                        resume.filePath,

                    jobUrl:
                        job.apply_link,
                });
        }

        else if (job.source === "WorkIndia") {

            result =
                await applyWorkIndiaJob({
                    resumePath:
                        resume.filePath,

                    jobUrl:
                        job.apply_link,
                });
        }

        else if (job.source === "Unstop") {

            result =
                await applyUnstopJob({
                    email:
                        process.env.UNSTOP_EMAIL,

                    password:
                        process.env.UNSTOP_PASSWORD,

                    resumePath:
                        resume.filePath,

                    jobUrl:
                        job.apply_link,
                });
        }

        const application =
            await Application.create({

                user: req.user._id,

                job: job._id,

                status:
                    result.success
                        ? "applied"
                        : "failed",

                appliedAt:
                    new Date(),

                platform:
                    job.source,
            });

        res.status(200).json({
            success: true,
            application,
            automation_result: result,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};