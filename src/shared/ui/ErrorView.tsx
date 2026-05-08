import Link from "next/link";
import {ErrorViewModel} from "@/infra/errors/getErrorViewModal";

type Props = {
  errorView: ErrorViewModel;
};

export function ErrorView({errorView}: Props) {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <h2 className="text-lg font-semibold">{errorView.title}</h2>

      <p className="text-sm text-muted-foreground">{errorView.description}</p>

      <Link href="/" className="text-sm underline">
        ホームへ戻る
      </Link>
    </div>
  );
}
