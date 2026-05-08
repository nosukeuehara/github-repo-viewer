import {z} from "zod";
import {searchParamsSchema} from "../components/RepositorySearchForm/lib";

export type SearchRepoParams = z.infer<typeof searchParamsSchema>;
