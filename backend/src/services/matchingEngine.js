export const calculateMatchScore = (userSkills, jobSkills) => {

    const normalize = (s) =>
        s.toLowerCase().replace(/\s|\./g, "");

    const normalizedUser = userSkills.map(normalize);
    const normalizedJob = jobSkills.map(normalize);

    const matchedSkills = normalizedJob.filter(skill =>
        normalizedUser.includes(skill)
    );

    const missingSkills = normalizedJob.filter(skill =>
        !normalizedUser.includes(skill)
    );

    const score =
        normalizedJob.length === 0
            ? 0
            : (matchedSkills.length / normalizedJob.length) * 100;

    return {
        match_score: Math.round(score),
        matched_skills: matchedSkills,
        missing_skills: missingSkills,
    };
};