import {z} from "zod";

export const repositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  url: z.string(),
  owner: z.object({
    avatar_url: z.string(),
  }),
});
