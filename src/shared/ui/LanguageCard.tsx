"use client";

import {RepositoryLanguagesResponse} from "@/feature/githubRepository/types";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../shadcn/components/ui/hover-card";

export function RepositoryLanguages({
  languages,
}: {
  languages: RepositoryLanguagesResponse;
}) {
  const sortedLanguages = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  const visibleLanguages = sortedLanguages.slice(0, 5);
  const hiddenLanguages = sortedLanguages.slice(5);

  return (
    <div className="flex flex-wrap items-end gap-x-2">
      {visibleLanguages.map(([lang, bytes], index) => {
        let sizeClass = "text-sm";

        if (index === 0) sizeClass = "text-xl font-bold";
        else if (index === 1) sizeClass = "text-base font-semibold";
        else if (index === 2) sizeClass = "text-sm font-medium";

        return (
          <HoverCard key={lang} openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
              <span className={`cursor-default ${sizeClass}`}>{lang}</span>
            </HoverCardTrigger>

            <HoverCardContent
              side="top"
              align="center"
              className="w-auto rounded-xs"
            >
              <p className="text-sm font-medium">{lang}</p>
              <p className="text-xs text-muted-foreground">
                {bytes.toLocaleString()} bytes
              </p>
            </HoverCardContent>
          </HoverCard>
        );
      })}

      {hiddenLanguages.length > 0 && (
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <span className="cursor-default text-sm text-muted-foreground">
              +{hiddenLanguages.length} more
            </span>
          </HoverCardTrigger>

          <HoverCardContent
            side="top"
            align="center"
            className="w-56 rounded-xs"
          >
            <p className="mb-2 text-sm font-medium">その他の言語</p>
            <ul className="space-y-1">
              {hiddenLanguages.map(([lang, bytes]) => (
                <li key={lang} className="flex justify-between gap-4 text-xs">
                  <span>{lang}</span>
                  <span className="text-muted-foreground">
                    {bytes.toLocaleString()} bytes
                  </span>
                </li>
              ))}
            </ul>
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  );
}
