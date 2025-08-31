import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import TransferRequestForm from "@modules/account/components/transfer-request-form"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="space-y-8" data-testid="orders-page-wrapper">
      {/* Header Section */}
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-tech-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-tech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-primary-900 mb-2">Order History</h1>
        <p className="text-gray-600">Track your purchases and manage returns</p>
      </div>

      {/* Orders Content */}
      <div className="space-y-8">
        <OrderOverview orders={orders} />
        <TransferRequestForm />
      </div>
    </div>
  )
}
