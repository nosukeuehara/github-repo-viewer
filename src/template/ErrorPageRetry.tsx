import {Button} from "@/shared/shadcn/components/ui/button";

export default function ErrorPageRetry({
  displayMessage,
  error,
  reset,
}: {
  displayMessage: string;
  error: Error & {status?: number};
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <p>{error.message}</p>

      <h2 className="text-xl font-semibold">{displayMessage}</h2>

      <p className="text-sm text-muted-foreground">Please try again later.</p>

      <Button onClick={() => reset()} className="rounded-md border px-4 py-2">
        Retry
      </Button>
    </div>
  );
}
