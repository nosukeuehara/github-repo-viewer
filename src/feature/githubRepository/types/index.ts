import {z} from "zod";
import {repositorySchema} from "../schemas/repositorySchema";
import {searchParamsSchema} from "../schemas/searchParams";

export type Repository = z.infer<typeof repositorySchema>;

export type SearchRepoParams = z.output<typeof searchParamsSchema>;
