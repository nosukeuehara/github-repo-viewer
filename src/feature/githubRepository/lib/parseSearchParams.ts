import {z} from "zod";

const pageSchema = z.coerce.number().int().positive().catch(1);

export function parseSearchParams(searchParams: {q?: string; page?: string}) {
  return {
    query:
      typeof searchParams.q === "string"
        ? searchParams.q.trim() || undefined
        : undefined,
    page: pageSchema.parse(searchParams.page),
  };
}
