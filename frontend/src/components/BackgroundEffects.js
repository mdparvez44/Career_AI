"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {

    return (

        <div className="fixed inset-0 -z-10 overflow-hidden">

            {/* ORB 1 */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 10,
                }}
                className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"
            />

            {/* ORB 2 */}
            <motion.div
                animate={{
                    x: [0, -80, 0],
                    y: [0, -60, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 12,
                }}
                className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"
            />

        </div>
    );
}