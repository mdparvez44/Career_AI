export default function MatchCard({ match }) {

    return (

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:scale-[1.02] transition">

            {/* JOB TITLE */}
            <h2 className="text-xl font-bold">
                {match.job.title}
            </h2>

            <p className="text-gray-400">
                {match.job.company}
            </p>

            {/* MATCH SCORE */}
            <div className="mt-4">

                <div className="flex justify-between mb-1">

                    <span className="text-sm">
                        AI Match Score
                    </span>

                    <span className="text-cyan-400 font-bold">
                        {match.match_score}%
                    </span>

                </div>

                <div className="w-full bg-gray-700 h-3 rounded-full">

                    <div
                        className="bg-cyan-400 h-3 rounded-full"
                        style={{
                            width:
                                `${match.match_score}%`,
                        }}
                    />

                </div>

            </div>

            {/* MATCHED SKILLS */}
            <div className="mt-5">

                <h3 className="font-semibold text-green-400">
                    Matched Skills
                </h3>

                <div className="flex flex-wrap gap-2 mt-2">

                    {match.matched_skills.map(
                        (skill, index) => (

                        <span
                            key={index}
                            className="px-2 py-1 bg-green-900 text-green-300 rounded-lg text-sm"
                        >
                            {skill}
                        </span>

                    ))}

                </div>

            </div>

            {/* MISSING SKILLS */}
            <div className="mt-5">

                <h3 className="font-semibold text-red-400">
                    Missing Skills
                </h3>

                <div className="flex flex-wrap gap-2 mt-2">

                    {match.missing_skills.map(
                        (skill, index) => (

                        <span
                            key={index}
                            className="px-2 py-1 bg-red-900 text-red-300 rounded-lg text-sm"
                        >
                            {skill}
                        </span>

                    ))}

                </div>

            </div>

            {/* APPLY BUTTON */}
            <a
                href={match.job.apply_link}
                target="_blank"
                className="mt-6 inline-block bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-lg font-semibold"
            >
                Apply Now
            </a>

        </div>
    );
}