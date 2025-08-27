"use client"

import { useState, useTransition } from "react"
import { User, Settings, Package, LogOut, Heart, Loader2, UserPlus } from "lucide-react"
import { Button } from "@modules/common/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@modules/common/components/ui/popover"
import { Separator } from "@modules/common/components/ui/separator"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"
import { useParams } from "next/navigation"

interface ProfileLink {
  label: string
  href: string
  icon: React.ReactNode
  testId?: string
}

interface ProfileDropDownProps {
  customer: HttpTypes.StoreCustomer | null
}

const authenticatedLinks: ProfileLink[] = [
  {
    label: "My Account",
    href: "/account",
    icon: <User className="h-4 w-4" />,
    testId: "profile-account-link"
  },
  {
    label: "Orders",
    href: "/account/orders",
    icon: <Package className="h-4 w-4" />,
    testId: "profile-orders-link"
  },
  {
    label: "Wishlist",
    href: "/account/wishlist",
    icon: <Heart className="h-4 w-4" />,
    testId: "profile-wishlist-link"
  },
  {
    label: "Settings",
    href: "/account/settings",
    icon: <Settings className="h-4 w-4" />,
    testId: "profile-settings-link"
  },
]

const unauthenticatedLinks: ProfileLink[] = [
  {
    label: "Sign In",
    href: "/account",
    icon: <User className="h-4 w-4" />,
    testId: "profile-signin-link"
  },
  // {
  //   label: "Create Account",
  //   href: "/account",
  //   icon: <UserPlus className="h-4 w-4" />,
  //   testId: "profile-signup-link"
  // },
]

export default function ProfileDropDown({ customer }: ProfileDropDownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { countryCode } = useParams()

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await signout(countryCode as string)
        setIsOpen(false)
      } catch (error) {
        console.error("Failed to sign out:", error)
        // You can add toast notification here
      }
    })
  }

  const getCustomerInitials = (customer: HttpTypes.StoreCustomer) => {
    const firstName = customer.first_name || ""
    const lastName = customer.last_name || ""
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "U"
  }

  const getCustomerName = (customer: HttpTypes.StoreCustomer) => {
    const firstName = customer.first_name || ""
    const lastName = customer.last_name || ""
    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    }
    return customer.email || "User"
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-muted/80 transition-colors"
          data-testid="profile-trigger"
        >
          {customer ? (
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-medium text-primary-foreground">
              {getCustomerInitials(customer)}
            </div>
          ) : (
            <User className="h-5 w-5" />
          )}
          <span className="sr-only">Profile</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 shadow-xl border-0 bg-white/95 backdrop-blur-sm" align="end">
        {customer ? (
          // Authenticated User Content
          <>
            {/* User Info Header */}
            <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-sm font-semibold text-primary-foreground">
                  {getCustomerInitials(customer)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {getCustomerName(customer)}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {customer.email}
                  </p>
                </div>
              </div>
            </div>
            <Separator />
            
            {/* Navigation Links */}
            <div className="p-2">
              {authenticatedLinks.map((link) => (
                <LocalizedClientLink
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted/80 transition-colors w-full group"
                  data-testid={link.testId}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </LocalizedClientLink>
              ))}
            </div>
            <Separator />
            
            {/* Sign Out */}
            <div className="p-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50/80 transition-colors"
                onClick={handleSignOut}
                disabled={isPending}
                data-testid="profile-logout-button"
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 mr-3 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4 mr-3" />
                )}
                {isPending ? "Signing out..." : "Sign Out"}
              </Button>
            </div>
          </>
        ) : (
          // Unauthenticated User Content
          <>
            {/* Guest Header */}
            <div className="p-4 bg-gradient-to-r from-muted/30 to-muted/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Welcome!</p>
                  <p className="text-xs text-muted-foreground">
                    Sign in to access your account
                  </p>
                </div>
              </div>
            </div>
            <Separator />
            
            {/* Auth Links */}
            <div className="p-2">
              {unauthenticatedLinks.map((link) => (
                <LocalizedClientLink
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted/80 transition-colors w-full group"
                  data-testid={link.testId}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </LocalizedClientLink>
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10">
              <LocalizedClientLink href="/account">
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Button>
              </LocalizedClientLink>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}