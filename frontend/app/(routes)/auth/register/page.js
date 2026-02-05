"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navigation from "@/app/components/common/Navigation";
import Footer from "@/app/components/common/Footer";
import Link from "next/link";

export default function RegisterPage() {
    const { register } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await register(name, email, password);
        if (!res.success) {
            setError(res.message);
        }
    };

    return (
        <>
            <Navigation />
            <div className="min-h-screen flex items-center justify-center bg-white px-4">
                <div className="w-full max-w-sm">
                    <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-medium">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded mt-1"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded mt-1"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded mt-1"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-black text-white py-2 rounded font-semibold hover:opacity-90"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="font-bold underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}
