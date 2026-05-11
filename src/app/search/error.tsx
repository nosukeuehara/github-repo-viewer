"use client";
import UnexpectedErrorTemplate from "@/template/Error/UnexpectedErrorTemplate";

export default function ErrorPage({reset}: {reset: () => void}) {
  return <UnexpectedErrorTemplate reset={reset} />;
}
