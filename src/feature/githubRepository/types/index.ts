import {z} from "zod";
import {repositorySchema} from "../../../infra/service/schemas/repositorySchema";
import {repositoryDetailSchema} from "../../../infra/service/schemas/repositoryDetailSchema";
import {repositoryLanguagesSchema} from "../../../infra/service/schemas/repositoryLanguageSchema";
import {searchParamsSchema} from "../components/RepositorySearchForm/lib";

export type Repository = z.infer<typeof repositorySchema>;

export type RepositoryDetail = z.infer<typeof repositoryDetailSchema>;

export type RepositoryLanguagesResponse = z.infer<
  typeof repositoryLanguagesSchema
>;

export type SearchRepoParams = z.output<typeof searchParamsSchema>;
