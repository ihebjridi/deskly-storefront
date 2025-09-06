import { Suspense } from "react"
import { Search, User, ShoppingCart } from "lucide-react"
import Image from "next/image"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"


export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* Top announcement bar */}
      <div className="bg-primary-900 text-white py-2">
        <div className="content-container text-center px-4">
          <span className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Free shipping on tech orders over $100 • 30-day tech warranty</span>
            <span className="sm:hidden">Free shipping over $100 • 30-day warranty</span>
          </span>
        </div>
      </div>
      
      <header className="relative py-4 mx-auto bg-white shadow-sm border-b border-gray-100">
        <nav className="content-container px-4 sm:px-6 text-base text-gray-600 flex items-center justify-between w-full">
          {/* Left: Logo */}
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="hover:opacity-80 transition-opacity duration-200"
              data-testid="nav-logo-link"
            >
              <Image
                src="/images/deskly-logo.png"
                alt="Deskly Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </LocalizedClientLink>
          </div>

          {/* Center: Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <LocalizedClientLink
              className="nav-link text-sm lg:text-base font-medium"
              href="/store"
              data-testid="nav-store-link"
            >
              Store
            </LocalizedClientLink>
            <LocalizedClientLink
              className="nav-link text-sm lg:text-base font-medium"
              href="/contact"
              data-testid="nav-contact-link"
            >
              Contact
            </LocalizedClientLink>
            <LocalizedClientLink
              className="nav-link text-sm lg:text-base font-medium"
              href="/about"
              data-testid="nav-about-link"
            >
              About Us
            </LocalizedClientLink>
          </div>

          {/* Right: Search, Profile, Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-32 sm:w-48 px-3 sm:px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-tech-blue focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
              />
              <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="w-4 h-4" />
              </div>
            </div>
            
            {/* Profile/Account */}
            <LocalizedClientLink
              href="/account"
              className="p-2.5 text-gray-500 hover:text-tech-blue hover:bg-gray-50 rounded-lg transition-all duration-200"
              data-testid="nav-account-link"
            >
              <User className="w-5 h-5" />
            </LocalizedClientLink>
            
            {/* Cart */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="nav-link p-2.5 text-gray-500 hover:text-tech-blue hover:bg-gray-50 rounded-lg transition-all duration-200"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingCart className="w-5 h-5" />
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
