"use client";
import TemporaryErrorTemplate from "@/template/Error/TemporaryErrorTemplate";

export default function ErrorPage({reset}: {reset: () => void}) {
  return <TemporaryErrorTemplate reset={reset} />;
}
