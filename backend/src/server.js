import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Career AI Backend Running");
});

app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
