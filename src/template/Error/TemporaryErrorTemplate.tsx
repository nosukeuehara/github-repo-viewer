import {getErrorViewModel} from "@/infra/errors/getErrorViewModal";
import {Button} from "@/shared/shadcn/components/ui/button";

export default function TemporaryErrorTemplate({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const errorView = getErrorViewModel(error);

  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <h2 className="text-lg font-semibold">{errorView.title}</h2>

      <p className="text-sm text-muted-foreground">{errorView.description}</p>

      {errorView.canRetry && <Button onClick={() => reset()}>Retry</Button>}
    </div>
  );
}
