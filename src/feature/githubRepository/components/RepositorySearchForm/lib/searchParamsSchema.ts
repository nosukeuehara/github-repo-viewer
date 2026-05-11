import {z} from "zod";
import {MAX_QUERY_LENGTH} from "@/feature/githubRepository/constants";

export const searchParamsSchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, "検索ワードを入力してください")
    .max(
      MAX_QUERY_LENGTH,
      `検索ワードは${MAX_QUERY_LENGTH}文字以内にしてください`
    ),
});
