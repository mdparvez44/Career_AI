"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex justify-between p-4 bg-black text-white border-b border-gray-800">

            <h1 className="font-bold">
                AI Career Agent
            </h1>

            <div className="flex gap-4">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard/upload">Upload</Link>
                <Link href="/dashboard/jobs">Jobs</Link>
            </div>

        </div>
    );
}