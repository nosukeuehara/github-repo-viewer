import Image from "next/image";
import {RepositoryLanguagesViewer} from "@/shared/ui/LanguageCard";
import {
  RepositoryDetail,
  RepositoryLanguages,
} from "@/infra/service/schemas/types";

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
