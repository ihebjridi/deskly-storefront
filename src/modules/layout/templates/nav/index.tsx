
import Image from "next/image"
import { Search, ChevronDown, Globe, Menu, X } from "lucide-react"

import { Button } from "@modules/common/components/ui/button"
import { Input } from "@modules/common/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@modules/common/components/ui/dropdown-menu"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SideMenu from "@modules/layout/components/side-menu"
import { StoreRegion } from "@medusajs/types"


import { navigationLinks, categoryLinks } from "./navigation-config"
import CartButton from "@modules/layout/components/cart-button"
import ProfileButton from "@modules/layout/components/profile-button"

interface HeaderProps {
  regions: StoreRegion[]
}

export default function Nav({ regions }: HeaderProps) {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        
        {/* Left Side - Logo and Navigation */}
        <div className="flex items-center gap-6 md:gap-10">
          {/* Mobile Side Menu */}
          <div className="md:hidden h-full flex items-center">
            <SideMenu regions={regions} />
          </div>
          
          {/* Logo */}
          <LocalizedClientLink href="/" className="flex gap-2 items-center">
            <Image src="/deskly-logo.png" alt="Deskly.ca Logo" width={120} height={40} className="h-8 w-auto" />
          </LocalizedClientLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {navigationLinks.map((link) => (
              <LocalizedClientLink
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
                data-testid={link.testId}
              >
                {link.label}
              </LocalizedClientLink>
            ))}
            
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                Categories <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categoryLinks.map((category) => (
                  <DropdownMenuItem key={category.href}>
                    <LocalizedClientLink href={category.href} className="w-full">
                      {category.label}
                    </LocalizedClientLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        
        {/* Right Side - Search, Region, Profile, Cart */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden md:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search gadgets..."
                className="w-[200px] pl-8 md:w-[250px] rounded-full bg-muted"
              />
            </div>
          </div>
          
          {/* Region Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-muted">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Region</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {regions.map((region) => (
                <DropdownMenuItem key={region.id}>
                  {region.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Profile Popup */}
          <div className="hidden md:flex">
            <ProfileButton />
          </div>
          
          {/* Cart Popup */}
          <CartButton  />
          
          {/* Mobile Menu Button */}
          {/* <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:bg-muted" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button> */}
        </div>
      </div>
      
      {/* Mobile Menu */}
      
    </header>
  )
}