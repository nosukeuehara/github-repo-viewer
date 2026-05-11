import {FieldErrors, UseFormRegister} from "react-hook-form";
import {SearchRepoParams} from "../../types";
import {Field, FieldDescription} from "@/shared/shadcn/components/ui/field";
import {Input} from "@/shared/shadcn/components/ui/input";
import {Button} from "@/shared/shadcn/components/ui/button";

type Props = {
  register: UseFormRegister<SearchRepoParams>;
  errors: FieldErrors<SearchRepoParams>;
  onSubmit: (data: SearchRepoParams) => void;
  isPending: boolean;
  className?: string;
};

export function RepositorySearchFormPresentation({
  register,
  errors,
  onSubmit,
  isPending,
  className,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        onSubmit({q: e.currentTarget.q.value});
      }}
      className={`flex items-start gap-2 ${className}`}
    >
      <Field className="flex-1">
        <Input
          {...register("q")}
          inputMode="text"
          type="text"
          placeholder="リポジトリ名を入力"
          className="h-8 px-2 rounded-xs"
        />
        <FieldDescription hidden={!errors.q?.message}>
          {errors.q?.message && (
            <span className="text-sm">{errors.q.message}</span>
          )}
        </FieldDescription>
      </Field>

      <Button
        type="submit"
        disabled={isPending}
        className="h-8 w-[20%] rounded-xs"
      >
        検索
      </Button>
    </form>
  );
}
