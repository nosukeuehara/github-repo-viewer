import Image from "next/image";
import {
  RepositoryDetail,
  RepositoryLanguages,
} from "@/infra/service/schemas/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/shadcn/components/ui/hover-card";

type RepositoryStat = {
  label: string;
  value: number;
};

type RepositoryDetailPresentationProps = {
  repo: RepositoryDetail;
  languages: RepositoryLanguages;
  stats: RepositoryStat[];
};

type RepositoryDetailHeaderProps = {
  repo: RepositoryDetail;
  languages: RepositoryLanguages;
};

export function RepositoryDetailPresentation({
  repo,
  languages,
  stats,
}: RepositoryDetailPresentationProps) {
  return (
    <section className="space-y-6">
      <RepositoryDetailHeader repo={repo} languages={languages} />
      <RepositoryStats stats={stats} />
    </section>
  );
}

function RepositoryDetailHeader({
  repo,
  languages,
}: RepositoryDetailHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Image
          src={repo.owner.avatar_url}
          alt={`${repo.owner.login} のアイコン`}
          width={100}
          height={100}
          priority
          className="
            rounded-full border object-cover
            w-16 h-16
            sm:w-20 sm:h-20
            md:w-24 md:h-24
          "
        />

        <div className="space-y-2 min-w-0">
          <h2 className="text-xl font-semibold sm:text-2xl">{repo.name}</h2>

          <RepositoryLanguagesViewer languages={languages} />

          {repo.description && (
            <p className="text-sm text-muted-foreground">{repo.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function RepositoryStats({stats}: {stats: Array<RepositoryStat>}) {
  return (
    <dl className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="space-y-2">
          <dt className="text-sm font-semibold">{stat.label}</dt>
          <dd className="text-sm text-muted-foreground">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function RepositoryLanguagesViewer({
  languages,
}: {
  languages: RepositoryLanguages;
}) {
  const sortedLanguages = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  const visibleLanguages = sortedLanguages.slice(0, 5);
  const hiddenLanguages = sortedLanguages.slice(5);

  return (
    <div className="flex flex-wrap items-end gap-x-2">
      {visibleLanguages.map(([lang, bytes], index) => {
        let sizeClass = "text-sm";

        if (index === 0) sizeClass = "text-xl font-bold";
        else if (index === 1) sizeClass = "text-base font-semibold";
        else if (index === 2) sizeClass = "text-sm font-medium";

        return (
          <HoverCard key={lang} openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
              <span className={`cursor-default ${sizeClass}`}>{lang}</span>
            </HoverCardTrigger>

            <HoverCardContent
              side="top"
              align="center"
              className="w-auto rounded-xs"
            >
              <p className="text-sm font-medium">{lang}</p>
              <p className="text-xs text-muted-foreground">
                {bytes.toLocaleString()} bytes
              </p>
            </HoverCardContent>
          </HoverCard>
        );
      })}

      {hiddenLanguages.length > 0 && (
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <span className="cursor-default text-sm text-muted-foreground">
              +{hiddenLanguages.length} more
            </span>
          </HoverCardTrigger>

          <HoverCardContent
            side="top"
            align="center"
            className="w-56 rounded-xs"
          >
            <p className="mb-2 text-sm font-medium">その他の言語</p>
            <ul className="space-y-1">
              {hiddenLanguages.map(([lang, bytes]) => (
                <li key={lang} className="flex justify-between gap-4 text-xs">
                  <span>{lang}</span>
                  <span className="text-muted-foreground">
                    {bytes.toLocaleString()} bytes
                  </span>
                </li>
              ))}
            </ul>
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  );
}
