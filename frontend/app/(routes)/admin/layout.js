import AdminSidebar from "@/app/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar />
            <main className="ml-0 lg:ml-64 p-4 lg:p-8 min-h-screen pt-20 lg:pt-8">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
