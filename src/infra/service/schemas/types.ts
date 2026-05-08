import {z} from "zod";
import {repositorySchema} from "./repositorySchema";
import {repositoryDetailSchema} from "./repositoryDetailSchema";
import {repositoryLanguagesSchema} from "./repositoryLanguageSchema";

export type Repository = z.infer<typeof repositorySchema>;

export type RepositoryDetail = z.infer<typeof repositoryDetailSchema>;

export type RepositoryLanguagesResponse = z.infer<
  typeof repositoryLanguagesSchema
>;
