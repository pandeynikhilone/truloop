import { Suspense } from "react";
import SubmitReviewClient from "./SubmitReviewClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <SubmitReviewClient />
    </Suspense>
  );
}
