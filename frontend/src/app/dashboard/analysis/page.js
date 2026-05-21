"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import MatchCard from "@/components/MatchCard";

import SkillRadar from "@/components/SkillRadar";

export default function AnalysisPage() {

    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const res = await api.get(
                "/match/generate",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setMatches(res.data.matches);

        } catch (err) {
            console.log(err);
        }
    };

    // SAMPLE RADAR DATA
    const radarData = [
        { skill: "React", level: 90 },
        { skill: "Node", level: 85 },
        { skill: "MongoDB", level: 80 },
        { skill: "Docker", level: 40 },
        { skill: "AWS", level: 60 },
    ];

    return (

        <div className="min-h-screen bg-black text-white p-6">

            {/* HEADER */}
            <div className="mb-8">

                <h1 className="text-4xl font-bold">
                    AI Match Analysis
                </h1>

                <p className="text-gray-400 mt-2">
                    AI-powered career intelligence dashboard
                </p>

            </div>

            {/* SKILL RADAR */}
            <div className="mb-10 p-6 bg-gray-900 border border-gray-800 rounded-xl">

                <h2 className="text-2xl font-semibold mb-4">
                    Skill Radar
                </h2>

                <SkillRadar data={radarData} />

            </div>

            {/* MATCH RESULTS */}
            <div>

                <h2 className="text-2xl font-semibold mb-4">
                    Job Match Results
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {matches.map((match, index) => (

                        <MatchCard
                            key={index}
                            match={match}
                        />

                    ))}

                </div>

            </div>

        </div>
    );
}