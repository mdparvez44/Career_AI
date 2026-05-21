"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import JobCard from "@/components/JobCard";
import AIScanner from "@/components/AIScanner";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user, logout } = useAuth(); // 👈 auth context
    const router = useRouter();

    // 🔐 PROTECT ROUTE
    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    useEffect(() => {
        if (user) {
            loadJobs();
        }
    }, [user]);

    const loadJobs = async () => {
        try {
            const res = await api.get("/jobs");
            setJobs(res.data.jobs);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();          // clear auth context
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">

            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold">
                        AI Career Dashboard
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Your intelligent job recommendation system
                    </p>
                </div>

                {/* USER SECTION */}
                <div className="flex items-center gap-4">
                    {user && (
                        <span className="text-cyan-400">
                            {user.email}
                        </span>
                    )}

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-4 py-2 rounded font-bold"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* AI SCANNER */}
            <div className="mb-10">
                <AIScanner />
            </div>

            {/* JOB SECTION */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">
                    Recommended Jobs
                </h2>

                {loading ? (
                    <p className="text-gray-400">
                        Loading jobs...
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {jobs.map((job) => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}