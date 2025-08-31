import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-tech-blue/10 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-tech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary-900">
            Already have an account?
          </h3>
          <p className="text-sm text-gray-600">
            Sign in for a better experience.
          </p>
        </div>
      </div>
      <LocalizedClientLink href="/account">
        <Button 
          variant="secondary" 
          className="px-6 py-2 bg-tech-blue hover:bg-tech-blue/90 text-white font-medium rounded-lg transition-colors duration-200" 
          data-testid="sign-in-button"
        >
          Sign in
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default SignInPrompt
