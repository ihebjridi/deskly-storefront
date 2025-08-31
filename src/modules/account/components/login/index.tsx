import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
      data-testid="login-page"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Welcome back</h1>
        <p className="text-gray-600">
          Sign in to access an enhanced shopping experience
        </p>
      </div>

      {/* Form */}
      <form className="w-full" action={formAction}>
        <div className="space-y-4 mb-6">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        
        <ErrorMessage error={message} data-testid="login-error-message" />
        
        <SubmitButton 
          data-testid="sign-in-button" 
          className="w-full bg-tech-blue hover:bg-tech-blue/90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-tech-blue/25"
        >
          Sign in
        </SubmitButton>
      </form>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-gray-100">
        <span className="text-gray-600">
          Not a member?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className="text-tech-blue hover:text-tech-blue/80 font-medium transition-colors duration-200"
            data-testid="register-button"
          >
            Join us
          </button>
        </span>
      </div>
    </div>
  )
}

export default Login
