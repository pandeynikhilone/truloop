"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditProductClient({ id }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        images: "",
        specifications: {} // Will act as a JSON string or simplified
    });

    // For specs editing, we'll keep it simple: string for now or just name/price/image focus
    // User asked for "admin privilages inside products > edit option", let's focus on main fields first.

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
                if (!res.ok) throw new Error("Product not found");
                const data = await res.json();
                setFormData({
                    name: data.name || "",
                    price: data.price || "",
                    images: data.images || "",
                    // Keeping specs read-only or simple for now unless requested
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Failed to update product");

            router.push("/admin/products");
            router.refresh();
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="text-gray-500 hover:text-black">
                    &larr; Back
                </Link>
                <h2 className="text-3xl font-bold">Edit Product</h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                        type="text"
                        name="images"
                        value={formData.images}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <p className="text-xs text-gray-500 mt-1">Currently supports URL strings.</p>
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
}
