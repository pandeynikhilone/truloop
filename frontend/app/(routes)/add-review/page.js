import { Suspense } from "react";
import SubmitReview from "@/app/components/review/SubmitReview";
import Loader from "@/app/components/common/Loader";

export default function Page() {
  return (
    <Suspense fallback={<Loader text="Preparing review module..." />}>
      <SubmitReview />
    </Suspense>
  );
}
