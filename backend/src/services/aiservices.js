import dotenv from "dotenv"

dotenv.config();
import Groq from "groq-sdk"

const groq = new Groq({
    apiKey:process.env.GROQ_API_KEY
});

export const analyzeResumeWithAI = async(resumeText) =>{
    try{
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content:`
                    You are an Ai Resume Analyzer.
                    Return ONLY valid JSON(no markdown, no backtricks).

                    Format:
                    {
                        "skills":[],
                        "technologies":[],
                        "experience_level":"",
                        "suggested_job_roles":[]
                    }
                    `,
                },
                {
                    role: "user",
                    content: resumeText
                },
            ],
            model: "llama-3.3-70b-versatile",
        });

        return completion.choices[0].message.content;
    } catch (error){
        console.log(error);
        throw new Error("AI analayzer failed /aiserver.js");
    }
};
