import { analyzeResumeWithAI } from "../services/aiservices.js";
export const analyzeResume = async (req, res) => {
    try{
        const {resumeText} = req.body;
        if(!resumeText){
            return res.status(400).json({
                message: "Resume text is required",
            });
        }
        const analysis = await analyzeResumeWithAI(resumeText);

        res.status(200).json({
            success: true,
            analysis,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}