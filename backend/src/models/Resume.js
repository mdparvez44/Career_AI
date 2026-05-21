import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        filePath: String,

        extractedText: String,

        skills: [String],

        technologies: [String],

        experience_level: String,

        suggested_job_roles: [String],
    },
    { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);