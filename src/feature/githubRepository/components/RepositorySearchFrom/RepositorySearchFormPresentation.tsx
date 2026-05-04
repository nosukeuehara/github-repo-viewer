"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useTransition} from "react";
import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";
import {Field, FieldDescription} from "@/shared/components/ui/field";
import {SearchRepoParams} from "../../types";
import {searchParamsSchema} from "../../schemas/searchParams";

type Props = {
  defaultQuery?: string;
};

export function RepositorySearchFormPresentation({
  defaultQuery = "",
  className,
}: Props & {className?: string}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SearchRepoParams>({
    resolver: zodResolver(searchParamsSchema),
    defaultValues: {
      q: defaultQuery,
    },
  });

  const onSubmit = (data: SearchRepoParams) => {
    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(data.q)}`);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex items-start gap-2 ${className}`}
    >
      <Field className="flex-1">
        <Input
          {...register("q")}
          inputMode="text"
          type="text"
          placeholder="リポジトリ名を入力"
          className="px-2 w-full rounded-xs"
        />
        <FieldDescription hidden={!errors.q?.message}>
          {errors.q?.message && (
            <span className=" text-sm">{errors.q.message}</span>
          )}
        </FieldDescription>
      </Field>

      <Button type="submit" disabled={isPending} className="w-[20%] rounded-xs">
        検索
      </Button>
    </form>
  );
}
