import ProductClient from "@/app/components/product/ProductClient";

export default async function Page({ params }) {
    const { id } = await params;
    return <ProductClient id={id} />;
}
