import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import resumeRoutes from "./routes/resumeRoutes.js";
import resumeUploadRoutes from "./routes/resumeuploadRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "passport";
import session from "express-session";
import jobRoutes from "./routes/jobRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

import "./config/passport.js";

dotenv.config();

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use(
    session({
        secret: "career_ai_secret",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("Career AI Backend Running");
});

app.use("/api/resume", resumeRoutes);
app.use("/api/resume", resumeUploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/application", applicationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
