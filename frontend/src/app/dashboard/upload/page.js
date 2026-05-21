"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleUpload = async () => {
        if (!file) return alert("Please select a file");

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("resume", file);

            // 1. upload resume
            const uploadRes = await api.post("/resume/upload", formData);
            console.log("UPLOAD RESPONSE:", uploadRes.data);

            setResult(uploadRes.data.resume);

            // 2. generate matches (IMPORTANT)
            const matchRes = await api.post("/matches/generate");
            console.log("MATCH GENERATION:", matchRes.data);

            // 3. redirect
            router.push("/dashboard/jobs");

        } catch (err) {
            console.log("UPLOAD ERROR:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">

            <h1 className="text-2xl font-bold">
                Upload Resume
            </h1>

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="mt-4"
            />

            <button
                onClick={handleUpload}
                className="bg-green-500 px-4 py-2 mt-4"
            >
                {loading ? "Analyzing..." : "Analyze"}
            </button>

            {result && (
                <div className="mt-6 p-4 bg-gray-900 rounded-xl">
                    <h2 className="text-xl">AI Analysis</h2>

                    <pre className="text-sm text-gray-300">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}