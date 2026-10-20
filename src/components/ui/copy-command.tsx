"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CopyCommandProps extends React.ComponentProps<"div"> {
  command: string
  prompt?: string
  copyLabel?: string
  copiedLabel?: string
  actions?: React.ReactNode
}

function CopyCommand({
  command,
  prompt = "$",
  copyLabel = "Copy",
  copiedLabel = "Copied!",
  actions,
  className,
  ...props
}: CopyCommandProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback if clipboard API fails
    }
  }, [command])

  return (
    <div
      data-slot="copy-command"
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-background px-3.5 py-2.5 font-mono text-xs text-foreground",
        className
      )}
      {...props}
    >
      <div className="overflow-x-auto whitespace-nowrap">
        {prompt && (
          <span className="mr-1.5 select-none font-semibold text-primary">
            {prompt}
          </span>
        )}
        <span>{command}</span>
      </div>
      <div className="flex shrink-0 items-center justify-end gap-2 font-sans">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex cursor-pointer items-center justify-center gap-1.5 h-7 rounded-lg border border-border bg-card px-2.5 text-xs font-medium text-foreground transition-colors hover:border-slate-300 hover:bg-muted"
        >
          {copied ? (
            <Check className="size-3.5 text-primary" />
          ) : (
            <Copy className="size-3.5 text-muted-foreground" />
          )}
          <span>{copied ? copiedLabel : copyLabel}</span>
        </button>
        {actions}
      </div>
    </div>
  )
}

export { CopyCommand }
