import { getSubmissionCount } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

async function Counter() {
  const count = await getSubmissionCount();

  const formattedCount = new Intl.NumberFormat('en-US').format(count);

  return (
    <p className="text-sm text-muted-foreground">
      Join <span className="font-bold text-foreground">{formattedCount}</span> developers who have already signed up!
    </p>
  );
}

function CounterSkeleton() {
    return (
        <div className="flex justify-center items-center h-6">
            <Skeleton className="h-4 w-64" />
        </div>
    );
}

export function SubmissionCounter() {
  return (
    <Suspense fallback={<CounterSkeleton />}>
      <Counter />
    </Suspense>
  );
}
