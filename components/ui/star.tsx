import type * as React from "react"
import { StarIcon } from "lucide-react"

function Star({ className, ...props }: React.HTMLAttributes<SVGElement>) {
  return <StarIcon className={className} {...props} />
}

export { Star }
