export const normalizeJob = (job) => {
    return {
        title: job.title || "",

        company: job.company || "",

        location: job.location || "",

        skills: job.skills || [],

        apply_link: job.apply_link || "",

        source: job.source || "",

        description: job.description || "",
    };
};