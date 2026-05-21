import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        },

        match_score: Number,

        matched_skills: [String],

        missing_skills: [String],
    },
    { timestamps: true }
);

export default mongoose.model("Match", matchSchema);