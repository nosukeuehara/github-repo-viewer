import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useTransition} from "react";
import {useForm} from "react-hook-form";
import {SearchRepoParams} from "../../types";
import {searchParamsSchema} from "../../schemas/searchParams";

export function useRepositorySearchForm({query = ""}: {query?: string}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const defaultQuery = query?.trim();

  const form = useForm<SearchRepoParams>({
    resolver: zodResolver(searchParamsSchema),
    defaultValues: {q: defaultQuery},
  });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(data.q)}`);
    });
  });

  return {
    register: form.register,
    errors: form.formState.errors,
    onSubmit,
    isPending,
  };
}
