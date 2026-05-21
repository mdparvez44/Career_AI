"use client";

import { motion } from "framer-motion";

export default function JobCard({ job }) {

    return (

        <motion.div
            whileHover={{
                scale: 1.03,
            }}

            className="glass p-5 rounded-2xl border border-cyan-500/20"
        >

            <h2 className="text-xl font-bold text-cyan-300">
                {job.title}
            </h2>

            <p className="text-gray-300 mt-2">
                {job.company}
            </p>

            <p className="text-gray-500 text-sm">
                {job.location}
            </p>

            <div className="mt-5 flex justify-between items-center">

                <span className="text-xs text-cyan-400">
                    {job.source}
                </span>

                <a
                    href={job.apply_link}
                    target="_blank"
                    className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-lg font-semibold"
                >
                    Apply
                </a>

            </div>

        </motion.div>
    );
}