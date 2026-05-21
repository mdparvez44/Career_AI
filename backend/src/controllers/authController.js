import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

//REGISTER
export const registerUser = async (req, res)=>{
    try{
        const {name, email, password}=req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email, 
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            token: generateToken(user._id),
            user,
        });

    }catch (e){
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};

export const loginUser = async (req, res)=>{
    try {
        const {email, password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message: "Invalid credentials",
            });
        }

        res.status(200).json({
            success: true,
            token: generateToken(user._id),
            user,
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};