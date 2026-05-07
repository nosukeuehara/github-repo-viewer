"use client";
import TemporaryErrorTemplate from "@/template/Error/TemporaryErrorTemplate";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & {status?: number};
  reset: () => void;
}) {
  return <TemporaryErrorTemplate error={error} reset={reset} />;
}
