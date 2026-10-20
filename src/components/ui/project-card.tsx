"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ProjectCardProps extends React.ComponentProps<"div"> {
  title: string
  description: string
  domain?: string
  href?: string
  icon?: React.ReactNode
  status?: "public" | "invite" | "archived"
  badgeText?: string
  tags?: string[]
  showTopStripe?: boolean
}

const defaultBadgeLabels: Record<"public" | "invite" | "archived", string> = {
  public: "Public",
  invite: "Invite Only",
  archived: "Archived · Offline",
}

const badgeStyles: Record<"public" | "invite" | "archived", string> = {
  public: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400",
  invite: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  archived: "bg-muted text-muted-foreground",
}

function ProjectCard({
  title,
  description,
  domain,
  href,
  icon,
  status = "public",
  badgeText,
  tags,
  showTopStripe = false,
  children,
  className,
  ...props
}: ProjectCardProps) {
  const isArchived = status === "archived"
  const resolvedBadge = badgeText ?? defaultBadgeLabels[status]
  const isInteractiveLink = Boolean(href && !isArchived && !children)

  const headerContent = (
    <div className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3.5">
        {icon && (
          <div
            className={cn(
              "flex size-[2.85rem] shrink-0 items-center justify-center rounded-[0.8125rem]",
              isArchived
                ? "bg-muted text-muted-foreground"
                : "bg-[#22c55e]/10 text-[#16a34a]"
            )}
          >
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={cn(
                "font-heading text-[1.125rem] font-bold text-card-foreground transition-colors",
                !isArchived && "group-hover/project:text-[#16a34a]"
              )}
            >
              {title}
            </h3>
            {resolvedBadge && (
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap",
                  badgeStyles[status]
                )}
              >
                {resolvedBadge}
              </span>
            )}
          </div>
          {domain && (
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">
              {domain}
            </p>
          )}
        </div>
      </div>

      {!isArchived && href && (
        <div className="mt-1 shrink-0 text-muted-foreground transition-all group-hover/project:translate-x-1 group-hover/project:text-[#16a34a]">
          <ArrowRight className="size-[1.1rem]" />
        </div>
      )}
    </div>
  )

  const inner = (
    <>
      {showTopStripe && (
        <div
          className={cn(
            "h-1.5 w-full",
            isArchived ? "bg-slate-300" : "bg-primary"
          )}
        />
      )}
      <div className="flex flex-1 flex-col p-6 sm:px-[1.65rem] sm:py-6">
        {href && !isArchived && children ? (
          <a href={href} className="block">
            {headerContent}
          </a>
        ) : (
          headerContent
        )}

        <p className="mt-3.5 flex-1 text-[0.925rem] leading-[1.65] text-slate-600 dark:text-muted-foreground">
          {description}
        </p>

        {children && <div className="mt-4">{children}</div>}

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2.5 py-0.5 text-[0.725rem] font-medium text-slate-600 dark:text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  )

  const baseClasses = cn(
    "group/project relative flex flex-col overflow-hidden rounded-[1.125rem] border border-[#e2e8f0] bg-card transition-all duration-200",
    isArchived
      ? "border-dashed bg-white/65"
      : "hover:-translate-y-0.5 hover:border-[#cbd5e1] hover:shadow-[0_12px_28px_-6px_rgba(15,23,42,0.07)]",
    className
  )

  if (isInteractiveLink && href) {
    return (
      <a
        data-slot="project-card"
        href={href}
        className={baseClasses}
      >
        {inner}
      </a>
    )
  }

  return (
    <div data-slot="project-card" className={baseClasses} {...props}>
      {inner}
    </div>
  )
}

export { ProjectCard }
