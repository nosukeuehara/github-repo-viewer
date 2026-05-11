import {z} from "zod";
import {MAX_QUERY_LENGTH} from "../constants";

const pageSchema = z.coerce.number().int().positive().catch(1);

export function parseSearchParams(searchParams: {q?: string; page?: string}) {
  const rawQuery =
    typeof searchParams.q === "string" ? searchParams.q.trim() : undefined;

  // 100文字を超える場合は無効なクエリとして扱う
  const query =
    rawQuery && rawQuery.length <= MAX_QUERY_LENGTH ? rawQuery : undefined;

  return {
    query: query || undefined,
    page: pageSchema.parse(searchParams.page),
  };
}
