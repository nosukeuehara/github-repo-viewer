import Image from "next/image";
import {RepositoryDetail, RepositoryLanguagesResponse} from "../../types";
import {RepositoryLanguages} from "@/shared/ui/LanguageCard";

type RepositoryStat = {
  label: string;
  value: number;
};

type RepositoryDetailPresentationProps = {
  repo: RepositoryDetail;
  languages: RepositoryLanguagesResponse;
  stats: RepositoryStat[];
};

type RepositoryDetailHeaderProps = {
  repo: RepositoryDetail;
  languages: RepositoryLanguagesResponse;
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
    <div className="flex items-start gap-4">
      <Image
        src={repo.owner.avatar_url}
        alt={`${repo.owner.login} のアイコン`}
        width={100}
        height={100}
        className="rounded-full border"
        priority
      />

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">{repo.name}</h2>
        <RepositoryLanguages languages={languages} />
        {repo.description && (
          <p className="text-sm text-muted-foreground">{repo.description}</p>
        )}
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
