"use client";

import { useEffect, useState } from "react";

export default function AdminOverview() {
    const [stats, setStats] = useState([
        { label: "Total Products", value: "-", trend: "Loading..." },
        { label: "Total Reviews", value: "-", trend: "Loading..." },
        { label: "Average Rating", value: "-", trend: "Loading..." },
    ]);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`);
                if (res.ok) {
                    const data = await res.json();
                    setStats([
                        { label: "Total Products", value: data.totalProducts, trend: "Updated now" },
                        { label: "Total Reviews", value: data.totalReviews, trend: "Updated now" },
                        { label: "Average Rating", value: data.averageRating, trend: "Updated now" },
                    ]);
                }
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            }
        }
        fetchStats();
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.label}</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-black">{stat.value}</span>
                        </div>
                        <p className="text-xs text-green-600 mt-2 font-medium">{stat.trend}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                <p className="text-gray-500 text-sm">No recent activity loaded.</p>
            </div>
        </div>
    );
}
