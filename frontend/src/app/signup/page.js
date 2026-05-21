"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {

        setLoading(true);

        try {

            await api.post("/auth/register", {
                name,
                email,
                password,
            });

            router.push("/login");

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">

            <div className="w-96 p-6 glass rounded-2xl">

                <h1 className="text-3xl font-bold text-cyan-400">
                    Signup
                </h1>

                <input
                    className="w-full mt-5 p-3 bg-black border border-gray-700 rounded"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="w-full mt-3 p-3 bg-black border border-gray-700 rounded"
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
                    onClick={handleSignup}
                    className="w-full mt-5 bg-cyan-500 text-black py-2 rounded font-bold"
                >
                    {loading ? "Creating account..." : "Signup"}
                </button>

                <p className="text-sm text-gray-400 mt-4 text-center">
                    Already have an account? <a href="/login" className="text-cyan-400">Login</a>
                </p>

            </div>
        </div>
    );
}