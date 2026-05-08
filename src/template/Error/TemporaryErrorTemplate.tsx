import Link from "next/link";

export default function TemporaryErrorTemplate() {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <h2 className="text-lg font-semibold">
        予期しないエラーが発生しました。
      </h2>

      <p className="text-sm text-muted-foreground">
        時間をおいて再度お試しください。
      </p>

      <Link href="/" className="text-sm underline">
        ホームへ戻る
      </Link>
    </div>
  );
}
