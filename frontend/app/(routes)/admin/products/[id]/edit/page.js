import EditProductClient from "@/app/components/admin/EditProductClient";

export default async function EditProductPage({ params }) {
    const { id } = await params;
    return <EditProductClient id={id} />;
}
