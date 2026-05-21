"use client";

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";

export default function SkillRadar({ data }) {

    return (

        <div className="w-full h-[350px]">

            <ResponsiveContainer>

                <RadarChart data={data}>

                    <PolarGrid />

                    <PolarAngleAxis dataKey="skill" />

                    <PolarRadiusAxis />

                    <Radar
                        dataKey="level"
                        stroke="#00ffff"
                        fill="#00ffff"
                        fillOpacity={0.6}
                    />

                </RadarChart>

            </ResponsiveContainer>

        </div>
    );
}