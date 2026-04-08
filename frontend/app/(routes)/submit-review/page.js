import { Suspense } from "react";
import SubmitReviewClient from "@/app/components/review/SubmitReviewClient";
import Loader from "@/app/components/common/Loader";

export default function Page() {
  return (
    <Suspense fallback={<Loader text="Preparing review module..." />}>
      <SubmitReviewClient />
    </Suspense>
  );
}
