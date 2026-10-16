"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep: number
  steps: { title: string; description?: string }[]
}

export function Stepper({ activeStep, steps, className, ...props }: StepperProps) {
  return (
    <div className={cn("flex flex-col md:flex-row gap-4", className)} {...props}>
      {steps.map((step, index) => {
        const isCompleted = index < activeStep
        const isCurrent = index === activeStep

        return (
          <div key={step.title} className="flex-1 flex flex-col md:flex-row gap-4 group">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                    ? "border-primary text-primary"
                    : "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-sm font-semibold",
                    isCurrent || isCompleted ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-xs text-muted-foreground">{step.description}</span>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "hidden md:block h-[2px] w-full self-center mt-4 md:mt-0 max-w-[50px] lg:max-w-full rounded-full transition-colors",
                  isCompleted ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
