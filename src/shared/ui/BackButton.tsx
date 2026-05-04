"use client";

import {useRouter} from "next/navigation";
import {Button} from "@/shared/shadcn/components/ui/button";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      className="no-underline hover:no-underline"
      variant="link"
      onClick={() => router.back()}
    >
      一覧へ戻る
    </Button>
  );
}
