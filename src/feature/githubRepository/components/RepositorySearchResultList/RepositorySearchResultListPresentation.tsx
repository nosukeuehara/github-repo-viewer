import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/shared/shadcn/components/ui/card";
import {cn} from "@/shared/lib/utils";
import {Repository} from "@/infra/service/schemas/types";

type Props = {
  query?: string;
  repositories: Repository[];
  totalCount: number;
  page: number;
  perPage: number;
};

export function RepositoryListPresentation({
  query,
  repositories,
  totalCount,
  className,
  page,
  perPage,
}: Props & {className?: string}) {
  if (query === undefined) return null;

  if (repositories.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {`"${query}" に関するリポジトリが見つかりませんでした。`}
      </p>
    );
  }

  return (
    <div className={cn(className, "space-y-4")}>
      {query && (
        <div className="space-y-2 mb-1">
          <h2 className="text-lg font-semibold">{`検索結果 ： "${query}"`}</h2>
          <p className="text-sm text-muted-foreground">
            約 {totalCount.toLocaleString()} 件中 {(page - 1) * perPage + 1} -{" "}
            {Math.min(page * perPage, totalCount)} 件を表示
          </p>
        </div>
      )}
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {repositories.map((repo) => (
          <li key={repo.id}>
            <Link href={`/repo/${repo.full_name}`} className="block">
              <Card className="transition hover:bg-muted/50 hover:shadow-sm rounded-xs">
                <CardContent className="flex items-center gap-4 p-4">
                  <Image
                    src={repo.owner.avatar_url}
                    alt={`${repo.full_name} のオーナーアイコン`}
                    width={56}
                    height={56}
                    className="rounded-full shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="truncate text-base font-semibold">
                      {repo.name}
                    </CardTitle>
                    <CardDescription className="truncate text-sm text-muted-foreground">
                      {repo.full_name}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
