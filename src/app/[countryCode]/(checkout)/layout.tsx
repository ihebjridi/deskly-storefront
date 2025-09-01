import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Badge, clx } from "@medusajs/ui"
import { ArrowLeft, Shield } from "lucide-react"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white relative min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b">
        <nav className="flex h-16 items-center container mx-auto px-4 md:px-6 justify-between">
          {/* Back to Cart Link */}
          <LocalizedClientLink
            href="/cart"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            data-testid="back-to-cart-link"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to cart</span>
            <span className="sm:hidden">Back</span>
          </LocalizedClientLink>

          {/* Store Logo/Name */}
          <LocalizedClientLink
            href="/"
            className="flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            data-testid="store-link"
          >
            <Shield className="h-5 w-5 text-blue-600" />
            <span>deskly.ca</span>
          </LocalizedClientLink>

          {/* Secure Checkout Badge */}
          <div className="flex items-center gap-2">
            <Badge className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              <Shield className="h-3 w-3 mr-1" />
              Secure Checkout
            </Badge>
          </div>
        </nav>
      </div>

      {/* Separator */}
      <div className="border-b border-gray-200" />

      {/* Main Content */}
      <div className="relative flex-1" data-testid="checkout-container">
        {children}
      </div>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-6 mt-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Secure Payments</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              © 2024 deskly.ca. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
