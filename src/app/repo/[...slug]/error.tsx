"use client";
import ErrorPageRetry from "@/template/ErrorPageRetry";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & {status?: number};
  reset: () => void;
}) {
  const MESSAGE_REPO_DETAIL_PAGE = "Failed to load repository data";
  return (
    <ErrorPageRetry
      displayMessage={MESSAGE_REPO_DETAIL_PAGE}
      error={error}
      reset={reset}
    />
  );
}
