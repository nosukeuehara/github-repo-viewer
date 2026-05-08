import {z} from "zod";
import {repositorySchema} from "./repositorySchema";

export const repositorySearchResponseSchema = z.object({
  items: z.array(repositorySchema),
  total_count: z.number(),
});
