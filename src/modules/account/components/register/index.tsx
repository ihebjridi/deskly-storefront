"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
      data-testid="register-page"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">
          Become a Deskly Member
        </h1>
        <p className="text-gray-600">
          Create your profile and get access to an enhanced shopping experience
        </p>
      </div>

      {/* Form */}
      <form className="w-full flex flex-col" action={formAction}>
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First name"
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
            />
            <Input
              label="Last name"
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
            />
          </div>
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        
        <ErrorMessage error={message} data-testid="register-error" />
        
        <div className="mb-6">
          <span className="text-sm text-gray-600">
            By creating an account, you agree to Deskly&apos;s{" "}
            <LocalizedClientLink
              href="/content/privacy-policy"
              className="text-tech-blue hover:text-tech-blue/80 underline"
            >
              Privacy Policy
            </LocalizedClientLink>{" "}
            and{" "}
            <LocalizedClientLink
              href="/content/terms-of-use"
              className="text-tech-blue hover:text-tech-blue/80 underline"
            >
              Terms of Use
            </LocalizedClientLink>
            .
          </span>
        </div>
        
        <SubmitButton 
          className="w-full bg-tech-blue hover:bg-tech-blue/90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-tech-blue/25" 
          data-testid="register-button"
        >
          Create Account
        </SubmitButton>
      </form>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-gray-100">
        <span className="text-gray-600">
          Already a member?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="text-tech-blue hover:text-tech-blue/80 font-medium transition-colors duration-200"
          >
            Sign in
          </button>
        </span>
      </div>
    </div>
  )
}

export default Register
