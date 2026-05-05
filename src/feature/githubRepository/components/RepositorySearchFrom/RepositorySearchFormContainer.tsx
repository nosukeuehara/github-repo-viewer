"use client";

import {RepositorySearchFormPresentation} from "./RepositorySearchFormPresentation";
import {useRepositorySearchForm} from "./userSearchForm";

export function RepositorySearchFormContainer({
  query,
  className,
}: {
  query?: string;
  className: string;
}) {
  const form = useRepositorySearchForm({query});

  return <RepositorySearchFormPresentation {...form} className={className} />;
}
