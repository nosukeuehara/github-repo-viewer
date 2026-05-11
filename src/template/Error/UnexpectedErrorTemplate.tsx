import {Button} from "@/shared/shadcn/components/ui/button";

export default function UnexpectedErrorTemplate({reset}: {reset: () => void}) {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <h2 className="text-lg font-semibold">
        予期しないエラーが発生しました。
      </h2>

      <p className="text-sm text-muted-foreground">
        時間をおいて再度お試しください。
      </p>

      <Button onClick={() => reset()}>Retry</Button>
    </div>
  );
}
