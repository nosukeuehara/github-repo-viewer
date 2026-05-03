import {z} from "zod";
import {repositorySchema} from "../schemas/repositorySchema";
import {searchParamsSchema} from "../schemas/searchParams";
import {repositoryDetailSchema} from "../schemas/repositoryDetailSchema";

export type Repository = z.infer<typeof repositorySchema>;

export type SearchRepoParams = z.output<typeof searchParamsSchema>;

export type RepositoryDetail = z.infer<typeof repositoryDetailSchema>;
