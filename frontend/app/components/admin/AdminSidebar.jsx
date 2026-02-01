"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Overview", href: "/admin" },
        { name: "Products", href: "/admin/products" },
        { name: "Reviews", href: "/admin/reviews" },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden text-white p-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <img src="/homepage/truloop_icon.svg" alt="Logo" className="w-8 h-8" />
                    <span className="font-bold">Truloop Admin</span>
                </div>
                <button onClick={toggleSidebar}>
                    <img src="/homepage/menu.svg" alt="Menu" className="w-6 h-6 invert" />
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`w-64 bg-black text-white min-h-screen flex flex-col p-6 fixed left-0 top-0 z-40 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <Link href="/">
                    <div className="mb-10 flex items-center gap-3 cursor-pointer">
                        <img
                            src="/admin/truloop_logo.svg"
                            alt="Truloop Logo"
                            className="w-10 h-10"
                        />
                        <span className="text-xl font-bold tracking-tight">Truloop Admin</span>
                    </div>
                </Link>

                <div className="lg:hidden mb-6 flex justify-end">
                    <button onClick={toggleSidebar} className="text-white">Close</button>
                </div>

                <nav className="flex flex-col gap-2">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                                <span
                                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? "bg-white text-black"
                                        : "text-gray-400 hover:text-white hover:bg-white/10"
                                        }`}
                                >
                                    {link.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto">
                    <Link href="/">
                        <div className="flex items-center hover:text-white hover:bg-white/10 rounded-lg w-max px-3">
                            <img src="/admin/exit.svg" alt="Exit" className="w-6 h-6" />
                            <span className="block px-4 py-3 text-sm font-medium text-gray-400">
                                Exit to Store
                            </span>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
