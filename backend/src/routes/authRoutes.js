import express from "express";
import passport from "passport";
import {registerUser, loginUser} from "../controllers/authController.js";
import { generateToken } from "../utils/generateToken.js";



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

//GOOGLE LOGIN
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

//GOOGLE CALLBACK
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/login",
    }),


    async(req, res)=>{
        const token = generateToken(req.user._id);
        res.json({
            success: true,
            token,
            user: req.user,
        });
    }
);

export default router;