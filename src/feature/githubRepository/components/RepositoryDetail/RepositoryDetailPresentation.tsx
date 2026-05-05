import Image from "next/image";
import {RepositoryDetail, RepositoryLanguagesResponse} from "../../types";
import {RepositoryLanguages} from "@/shared/ui/LanguageCard";

type Props = {
  repo: RepositoryDetail;
  languages: RepositoryLanguagesResponse;
};

type RepoStats = {stats: Array<{label: string; value: number}>};

export function RepositoryDetailPresentation({
  repo,
  languages,
  stats,
}: Props & RepoStats) {
  return (
    <section className="space-y-6">
      <RepositoryDetailHeader repo={repo} languages={languages} />
      <RepositoryStats stats={stats} />
    </section>
  );
}

function RepositoryDetailHeader({repo, languages}: Props) {
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

function RepositoryStats(props: RepoStats) {
  return (
    <dl className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
      {props.stats.map((stat) => (
        <div key={stat.label} className="space-y-2">
          <dt className="text-sm font-semibold">{stat.label}</dt>
          <dd className="text-sm text-muted-foreground">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
