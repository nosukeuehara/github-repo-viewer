import {notFound} from "next/navigation";

export function parseRepositorySlug(slug?: string[]) {
  if (!slug || slug.length !== 2) {
    notFound();
  }

  const [owner, repo] = slug;

  if (!owner.trim() || !repo.trim()) {
    notFound();
  }

  return {owner, repo};
}
