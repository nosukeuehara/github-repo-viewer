import {z} from "zod";
import {repositorySchema} from "../schemas/repositorySchema";
import {searchParamsSchema} from "../schemas/searchParamsSchema";
import {repositoryDetailSchema} from "../schemas/repositoryDetailSchema";
import {repositoryLanguagesSchema} from "../schemas/repositoryLanguageSchema";

export type Repository = z.infer<typeof repositorySchema>;

export type SearchRepoParams = z.output<typeof searchParamsSchema>;

export type RepositoryDetail = z.infer<typeof repositoryDetailSchema>;

export type RepositoryLanguagesResponse = z.infer<
  typeof repositoryLanguagesSchema
>;
