"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import MatchCard from "@/components/MatchCard";

export default function JobsPage() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            setLoading(true);

            const res = await api.get("/matches/me");

            console.log("MATCHES RESPONSE:", res.data);

            setMatches(res.data.matches || []);

        } catch (err) {
            console.log("FETCH ERROR:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 text-white">
            <h1 className="text-4xl font-bold text-cyan-400">
                AI Recommended Jobs
            </h1>

            <p className="text-gray-400 mt-2">
                Jobs ranked according to your skills
            </p>

            {loading ? (
                <p className="mt-6 text-gray-400">
                    Loading matches...
                </p>
            ) : matches.length === 0 ? (
                <p className="mt-6 text-red-400">
                    No matches found. Try uploading resume again.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                    {matches.map((match) => (
                        <MatchCard key={match._id} match={match} />
                    ))}
                </div>
            )}
        </div>
    );
}