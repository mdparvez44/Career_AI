"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function UploadBox() {

    const [file, setFile] = useState(null);

    const [loading, setLoading] =
        useState(false);

    const [result, setResult] =
        useState(null);

    const uploadResume = async () => {

        if (!file) return;

        setLoading(true);

        try {

            const token =
                localStorage.getItem("token");

            const formData =
                new FormData();

            formData.append(
                "resume",
                file
            );

            const res = await api.post(
                "/resume/upload",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setResult(res.data.resume);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="glass p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-cyan-400">

                Upload Resume

            </h2>

            <input
                type="file"
                className="mt-5 block"
                onChange={(e) =>
                    setFile(
                        e.target.files[0]
                    )
                }
            />

            <button
                onClick={uploadResume}
                className="mt-5 bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2 rounded-lg font-semibold"
            >

                {loading
                    ? "Analyzing..."
                    : "Upload & Analyze"}

            </button>

            {/* RESULT */}
            {result && (

                <div className="mt-6">

                    <h3 className="text-xl font-bold">

                        AI Analysis

                    </h3>

                    <div className="mt-4 space-y-3">

                        <div>
                            <strong>
                                Skills:
                            </strong>

                            <p>
                                {result.skills?.join(", ")}
                            </p>
                        </div>

                        <div>
                            <strong>
                                Technologies:
                            </strong>

                            <p>
                                {result.technologies?.join(", ")}
                            </p>
                        </div>

                        <div>
                            <strong>
                                Experience:
                            </strong>

                            <p>
                                {result.experience_level}
                            </p>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}