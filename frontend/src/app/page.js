"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import JobCard from "@/components/JobCard";

import AIScanner from "@/components/AIScanner";

import AIAssistant from "@/components/AIAssistant";

import BackgroundEffects
from "@/components/BackgroundEffects";

export default function Dashboard() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            const res =
                await api.get("/jobs");

            setJobs(res.data.jobs);

        } catch (err) {

            console.log(err);
        }
    };

    return (

        <div className="min-h-screen text-white p-6 grid-bg relative">

            <BackgroundEffects />

            {/* HEADER */}
            <div className="mb-10">

                <h1 className="text-5xl font-bold text-cyan-400">

                    AI Career OS

                </h1>

                <p className="text-gray-400 mt-3">

                    Futuristic AI-powered career intelligence platform

                </p>

            </div>

            {/* TOP SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="glass p-6 rounded-2xl glow">

                        <AIScanner />

                    </div>

                    {/* JOB FEED */}
                    <div className="glass p-6 rounded-2xl">

                        <h2 className="text-2xl font-bold mb-5">

                            Recommended Jobs

                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {jobs.map((job) => (

                                <JobCard
                                    key={job._id}
                                    job={job}
                                />

                            ))}

                        </div>

                    </div>

                </div>

                {/* RIGHT */}
                <div>

                    <AIAssistant />

                </div>

            </div>

        </div>
    );
}