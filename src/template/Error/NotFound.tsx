import Link from "next/link";

export function NotFound() {
  return (
    <div className="flex flex-col items-center py-12">
      <div className="mb-10 text-center space-y-5">
        <h2 className="text-lg font-semibold">
          リポジトリが見つかりませんでした。
        </h2>

        <p className="text-sm text-muted-foreground">
          URL やリポジトリ名を確認してください。
        </p>
      </div>

      <Link href="/" className="text-sm">
        ホームへ戻る
      </Link>
    </div>
  );
}
