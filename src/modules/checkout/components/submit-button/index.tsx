"use client"

import { Button } from "@modules/common/components/ui/button"
// import { Button } from "@medusajs/ui"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "default",
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "secondary" | "default" | "destructive" | "outline" | "ghost" | "link" | null | undefined
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      size="lg"
      className={className}
      type="submit"
      isLoading={pending}
      variant={variant || "default"}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  )
}
