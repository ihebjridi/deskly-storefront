"use client"


import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import React from "react"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-tech-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-tech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-primary-900 mb-2">
          Order #{order.display_id} Details
        </h1>
        <p className="text-gray-600">Complete order information and tracking</p>
        
        {/* Back Button */}
        <div className="mt-6">
          <LocalizedClientLink
            href="/account/orders"
            className="inline-flex items-center gap-2 text-tech-blue hover:text-tech-blue/80 transition-colors duration-200"
            data-testid="back-to-overview-button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Orders
          </LocalizedClientLink>
        </div>
      </div>

      {/* Order Content */}
      <div
        className="space-y-6"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        <Items order={order} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
        <Help />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
