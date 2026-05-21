import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const analyzeResumeWithAI = async (resumeText) => {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `
You are an AI Resume Analyzer.

Return ONLY valid JSON.
No markdown, no backticks, no explanation.

Format:
{
  "skills": [],
  "technologies": [],
  "experience_level": "",
  "suggested_job_roles": []
}
`
                },
                {
                    role: "user",
                    content: resumeText,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.2,
        });

        const raw = completion.choices[0].message.content;

        console.log("RAW AI OUTPUT:", raw);

        // 🔥 IMPORTANT FIX
        const parsed = JSON.parse(raw);

        return parsed;

    } catch (error) {
        console.log("AI ERROR:", error);
        throw new Error("AI analyzer failed /aiserver.js");
    }
};