import {z} from "zod";

export const repositoryLanguagesSchema = z.record(z.string(), z.number());
