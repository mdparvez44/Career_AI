"use client";

import { motion } from "framer-motion";

export default function AIAssistant() {

    return (

        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass p-5 rounded-2xl glow"
        >

            <h2 className="text-2xl font-bold text-cyan-400">
                AI Butler
            </h2>

            <p className="text-gray-300 mt-3">
                Your intelligent career assistant is active.
            </p>

            <div className="mt-5 space-y-3">

                <div className="p-3 bg-cyan-500/10 rounded-lg">
                    🔍 Scanning opportunities...
                </div>

                <div className="p-3 bg-cyan-500/10 rounded-lg">
                    🧠 Matching your skills...
                </div>

                <div className="p-3 bg-cyan-500/10 rounded-lg">
                    🚀 AI recommendations ready
                </div>

            </div>

        </motion.div>
    );
}