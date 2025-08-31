"use client"

import { Button } from "@medusajs/ui"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "primary",
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  const getButtonClass = () => {
    switch (variant) {
      case "primary":
        return "btn-primary"
      case "secondary":
        return "btn-secondary"
      case "danger":
        return "btn-primary bg-error hover:bg-error/90"
      default:
        return "btn-primary"
    }
  }

  return (
    <Button
      size="large"
      className={`${getButtonClass()} ${className || ""}`}
      type="submit"
      isLoading={pending}
      variant={variant || "primary"}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  )
}
