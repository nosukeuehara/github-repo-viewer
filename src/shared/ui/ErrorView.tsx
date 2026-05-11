"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {ErrorViewModel} from "@/infra/errors/getErrorViewModal";
import {Button} from "@/shared/shadcn/components/ui/button";

type Props = {
  errorView: ErrorViewModel;
};

export function ErrorView({errorView}: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <h2 className="text-lg font-semibold">{errorView.title}</h2>

      <p className="text-sm text-muted-foreground">{errorView.description}</p>

      {errorView.canRetry ? (
        <Button onClick={() => router.refresh()}>リトライ</Button>
      ) : (
        <Link href="/" className="text-sm underline">
          ホームへ戻る
        </Link>
      )}
    </div>
  );
}
