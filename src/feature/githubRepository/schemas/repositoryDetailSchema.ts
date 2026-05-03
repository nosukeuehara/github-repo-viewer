import {z} from "zod";

export const repositoryDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  watchers_count: z.number(),
  open_issues_count: z.number(),
  language: z.string().nullable(),
  owner: z.object({
    login: z.string(),
    avatar_url: z.string(),
  }),
});
