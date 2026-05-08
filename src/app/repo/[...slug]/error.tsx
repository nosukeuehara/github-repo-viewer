"use client";
import TemporaryErrorTemplate from "@/template/Error/TemporaryErrorTemplate";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <TemporaryErrorTemplate error={error} reset={reset} />;
}
