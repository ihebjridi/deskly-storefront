import { Button } from "@medusajs/ui"
import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6" data-testid="order-card">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-tech-blue/10 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-tech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-primary-900">
              Order #{order.display_id}
            </h3>
            <p className="text-sm text-gray-600">
              {new Date(order.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary-900">
            {convertToLocale({
              amount: order.total,
              currency_code: order.currency_code,
            })}
          </div>
          <div className="text-sm text-gray-600">
            {numberOfLines} {numberOfLines > 1 ? "items" : "item"}
          </div>
        </div>
      </div>

      {/* Order Items Preview */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Items</h4>
        <div className="grid grid-cols-3 gap-3">
          {order.items?.slice(0, 3).map((i) => (
            <div
              key={i.id}
              className="flex flex-col items-center text-center"
              data-testid="order-item"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                {i.thumbnail ? (
                  <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
                ) : (
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="text-xs text-gray-600 font-medium" data-testid="item-title">
                {i.title.length > 20 ? `${i.title.substring(0, 20)}...` : i.title}
              </div>
              <div className="text-xs text-gray-500" data-testid="item-quantity">
                Qty: {i.quantity}
              </div>
            </div>
          ))}
          {numberOfProducts > 3 && (
            <div className="w-16 h-16 bg-gray-50 rounded-lg flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-gray-400">+</span>
              <span className="text-xs text-gray-500">{numberOfProducts - 3}</span>
            </div>
          )}
        </div>
      </div>

      {/* Order Status and Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600 capitalize">
            {order.status?.replace('_', ' ')}
          </span>
        </div>
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button 
            data-testid="order-details-link" 
            variant="secondary"
            className="px-4 py-2 text-sm font-medium text-tech-blue border border-tech-blue hover:bg-tech-blue hover:text-white transition-colors duration-200 rounded-lg"
          >
            View Details
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderCard
