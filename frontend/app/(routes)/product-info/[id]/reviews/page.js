import AllReviewsClient from "@/app/components/review/AllReviewsClient";

export default async function Page({ params }) {
    const { id } = await params;
    return <AllReviewsClient id={id} />;
}
