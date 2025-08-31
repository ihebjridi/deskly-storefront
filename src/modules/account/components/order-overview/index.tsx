"use client"

import { Button } from "@medusajs/ui"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {orders.map((o) => (
          <div key={o.id}>
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="bg-gray-50 rounded-lg p-8 text-center"
      data-testid="no-orders-container"
    >
      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-primary-900 mb-2">No orders yet</h2>
      <p className="text-gray-600 mb-6">
        You don&apos;t have any orders yet, let us change that {":)"}
      </p>
      <LocalizedClientLink href="/store" passHref>
        <Button 
          className="px-6 py-3 bg-tech-blue hover:bg-tech-blue/90 text-white font-medium rounded-lg transition-colors duration-200"
          data-testid="continue-shopping-button"
        >
          Start Shopping
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default OrderOverview
