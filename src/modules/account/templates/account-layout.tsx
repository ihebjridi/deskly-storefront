import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  // If no customer (login/register), render children directly
  if (!customer) {
    return <>{children}</>
  }

  // If customer exists (dashboard), render full layout
  return (
    <div className="min-h-screen bg-gray-50" data-testid="account-page">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-900">My Account</h1>
              <p className="text-gray-600 mt-1">Manage your profile, orders, and preferences</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome back,</span>
              <span className="font-semibold text-primary-900">{customer.first_name || customer.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:sticky lg:top-8 h-fit">
            <AccountNav customer={customer} />
          </div>
          
          {/* Main Content Area */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
