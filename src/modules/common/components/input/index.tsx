import React, { useEffect, useImperativeHandle, useState } from "react"


import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"


type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex flex-col w-full space-y-2">
        {topLabel && (
          <Label className="text-sm font-medium">{topLabel}</Label>
        )}
        <div className="relative">
          <Input
            type={inputType}
            name={name}
            placeholder={label}
            required={required}
            className="pr-10"
            {...props}
            ref={inputRef}
          />
          {/* {required && (
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-rose-500 pointer-events-none">
              *
            </span>
          )} */}
          {type === "password" && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
            </Button>
          )}
        </div>
      </div>
    )
  }
)

FormInput.displayName = "FormInput"

export { FormInput }