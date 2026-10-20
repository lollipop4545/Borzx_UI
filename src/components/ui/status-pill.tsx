"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusPillVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-2xs transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-muted-foreground",
        success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        warning: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
        offline: "border-border bg-muted text-muted-foreground",
        info: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const statusDotVariants = cva("size-2 shrink-0 rounded-full", {
  variants: {
    status: {
      online: "bg-primary shadow-[0_0_0_3px_rgba(34,197,94,0.2)]",
      warning: "bg-amber-500 shadow-[0_0_0_3px_rgba(245,158,11,0.2)]",
      offline: "bg-slate-400",
      info: "bg-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.2)]",
    },
  },
  defaultVariants: {
    status: "online",
  },
})

export interface StatusPillProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof statusPillVariants> {
  status?: "online" | "warning" | "offline" | "info"
  showDot?: boolean
}

function StatusPill({
  className,
  variant = "default",
  status = "online",
  showDot = true,
  children,
  ...props
}: StatusPillProps) {
  return (
    <div
      data-slot="status-pill"
      className={cn(statusPillVariants({ variant }), className)}
      {...props}
    >
      {showDot && (
        <span
          aria-hidden="true"
          className={cn(statusDotVariants({ status }))}
        />
      )}
      <span>{children}</span>
    </div>
  )
}

export { StatusPill, statusPillVariants, statusDotVariants }
