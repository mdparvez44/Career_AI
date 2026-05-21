"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);

        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            login(res.data.user, res.data.token);
            router.push("/dashboard");

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:5000/api/auth/google";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">

            <div className="w-96 p-6 glass rounded-2xl">

                <h1 className="text-3xl font-bold text-cyan-400">
                    Login
                </h1>

                <input
                    className="w-full mt-5 p-3 bg-black border border-gray-700 rounded"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full mt-3 p-3 bg-black border border-gray-700 rounded"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full mt-5 bg-cyan-500 text-black py-2 rounded font-bold"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* Google Login Button */}
                <button
                    className="w-full mt-3 bg-white text-black py-2 rounded font-bold"
                    onClick={handleGoogleLogin}
                >
                    Continue with Google
                </button>

                <p className="text-sm text-gray-400 mt-4 text-center">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-cyan-400">
                        Signup
                    </a>
                </p>

            </div>
        </div>
    );
}