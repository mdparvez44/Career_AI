import { motion } from "framer-motion";

export default function AIScanner() {
    return (
        <div className="flex items-center gap-6 p-6 bg-gray-900 rounded-xl border border-gray-800">

            <motion.div
                className="w-16 h-16 border-4 border-cyan-400 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear"
                }}
            />

            <div>
                <h3 className="text-lg font-bold">
                    AI Career Scanner
                </h3>

                <p className="text-gray-400 text-sm">
                    Analyzing your profile & matching jobs...
                </p>
            </div>

        </div>
    );
}