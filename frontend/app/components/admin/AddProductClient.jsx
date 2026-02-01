"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUpload from "../common/ImageUpload";

export default function AddProductClient() {
    const router = useRouter();
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        price: "",
        description: "",
        images: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUploadSuccess = (url, data) => {
        console.log('Image uploaded successfully:', data);
        setUploadedImageUrl(url);
        setFormData((prev) => ({ ...prev, images: [url] })); // Store as array
        setUploading(false);
    };

    const handleImageUploadError = (error) => {
        console.error('Upload error:', error);
        alert('Image upload failed: ' + error.message);
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form submission started', formData);

        // Validation
        if (!formData.images || formData.images.length === 0) {
            alert("Please upload a product image");
            return;
        }

        if (!formData.name || !formData.brand || !formData.price || !formData.description) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const url = `${apiUrl}/api/products`;

            // Format data to match Product model
            const productData = {
                name: formData.name,
                brand: formData.brand,
                price: parseFloat(formData.price), // Convert to number
                description: formData.description,
                images: formData.images, // Already an array
            };

            console.log('Submitting to:', url);
            console.log('Product data:', productData);

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });

            console.log('Response status:', res.status);
            const data = await res.json();
            console.log('Response data:', data);

            if (!res.ok) {
                throw new Error(data.error || data.message || "Failed to create product");
            }

            alert('Product created successfully!');
            console.log("Product created:", data);

            // Redirect to products list
            router.push("/admin/products");
            router.refresh();
        } catch (err) {
            console.error('Error creating product:', err);
            alert('Error: ' + err.message);
        }
    };

    return (
        <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="text-gray-500 hover:text-black">
                    &larr; Back
                </Link>
                <h2 className="text-3xl font-bold">Add New Product</h2>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6"
            >
                {/* Product Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Image *
                    </label>
                    <ImageUpload
                        onUploadSuccess={handleImageUploadSuccess}
                        onUploadError={handleImageUploadError}
                        buttonText="Upload Product Image"
                    />
                    {uploadedImageUrl && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-700 font-medium">
                                ✓ Image uploaded successfully
                            </p>
                            <a
                                href={uploadedImageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-green-600 hover:underline break-all"
                            >
                                {uploadedImageUrl}
                            </a>
                        </div>
                    )}
                </div>

                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter product name"
                        required
                    />
                </div>

                {/* Brand */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brand *
                    </label>
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter brand name"
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price *
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="e.g., 99.99"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Enter product description"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-4 py-3 rounded-lg font-bold transition-colors bg-black text-white hover:bg-gray-800"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
}
