import Job from "../models/Job.js";

import { normalizeJob } from "../utils/jobNormalizer.js";

import { scrapeInternshalaJobs }
from "../services/scrapers/internshalaScraper.js";

import { scrapeWellfoundJobs }
from "../services/scrapers/wellfoundScraper.js";

import { scrapeUnstopJobs }
from "../services/scrapers/unstopScraper.js";

import { scrapeWorkIndiaJobs }
from "../services/scrapers/workIndiaScraper.js";

import { scrapeLinkedinJobs }
from "../services/scrapers/linkedinScraper.js";


// FETCH + SAVE JOBS
export const fetchJobs = async (req, res) => {
    try {

const [
    internshalaJobs,
    wellfoundJobs,
    unstopJobs,
    workIndiaJobs,
    linkedinJobs
] = await Promise.all([

    scrapeInternshalaJobs(),
    scrapeWellfoundJobs(),
    scrapeUnstopJobs(),
    scrapeWorkIndiaJobs(),
    scrapeLinkedinJobs(),
    ]);

const allJobs = [

    ...internshalaJobs,
    ...wellfoundJobs,
    ...unstopJobs,
    ...workIndiaJobs,
    ...linkedinJobs,
];

        let savedJobs = [];

        for (const job of allJobs) {

            const normalizedJob =
                normalizeJob(job);

            const existingJob =
                await Job.findOne({
                    title: normalizedJob.title,
                    company: normalizedJob.company,
                });

            if (!existingJob) {

                const newJob =
                    await Job.create(normalizedJob);

                savedJobs.push(newJob);
            }
        }

        res.status(200).json({
            success: true,
            total_jobs: savedJobs.length,
            jobs: savedJobs,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET SAVED JOBS
export const getJobs = async (req, res) => {

    try {

        const jobs = await Job.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: jobs.length,
            jobs,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};