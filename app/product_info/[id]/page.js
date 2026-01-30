import ProductClient from "./ProductClient";

export default async function Page({ params }) {
  const { id } = await params;
  return <ProductClient id={id} />;
}