"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminProductsClient() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const handleDelete = async (productId, productName) => {
        if (!confirm(`Are you sure you want to delete "${productName}"?`)) {
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                // Remove product from state
                setProducts(products.filter(p => p._id !== productId));
                alert("Product deleted successfully!");
            } else {
                alert("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Error deleting product");
        }
    };

    if (loading) return <div>Loading products...</div>;

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold">Products</h2>
                <Link href="/admin/products/new">
                    <button className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors">
                        + Add Product
                    </button>
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Product</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={product.images?.[0] || "/homepage/rectangle.svg"}
                                            alt={product.name}
                                            className="w-10 h-10 rounded-md object-cover bg-gray-100"
                                        />
                                        <span className="font-medium text-gray-900">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{product.price}</td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <span>⭐</span>
                                        <span className="font-medium">{product.averageRating || 0}</span>
                                        <span className="text-gray-400 text-xs">({product.reviewCount || 0})</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Link href={`/admin/products/${product._id}/edit`}>
                                            <button className="text-gray-400 hover:text-black hover:underline text-sm font-medium">Edit</button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id, product.name)}
                                            className="text-gray-400 hover:text-red-600 hover:underline text-sm font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div className="p-8 text-center text-gray-500 text-sm">No products found.</div>
                )}
            </div>
        </div>
    );
}
