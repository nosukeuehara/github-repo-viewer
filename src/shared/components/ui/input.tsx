import * as React from "react";

import {cn} from "@/shared/lib/utils";

function Input({className, type, ...props}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full rounded-md border border-input outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-400/30 focus:ring-offset-0",
        className
      )}
      {...props}
    />
  );
}

export {Input};
