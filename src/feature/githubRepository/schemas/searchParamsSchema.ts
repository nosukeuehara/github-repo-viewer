import {z} from "zod";

export const searchParamsSchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, "検索ワードを入力してください")
    .max(100, "検索ワードは100文字以内にしてください"),
});
