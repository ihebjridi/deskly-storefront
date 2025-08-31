import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return
    }

    return convertToLocale({
      amount,
      currency_code: order.currency_code,
    })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-tech-blue/10 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-tech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-primary-900">Order Summary</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-700">Subtotal</span>
          <span className="text-sm font-medium text-primary-900">{getAmount(order.subtotal)}</span>
        </div>
        
        {order.discount_total > 0 && (
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">Discount</span>
            <span className="text-sm font-medium text-green-600">- {getAmount(order.discount_total)}</span>
          </div>
        )}
        
        {order.gift_card_total > 0 && (
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">Gift Card</span>
            <span className="text-sm font-medium text-green-600">- {getAmount(order.gift_card_total)}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-700">Shipping</span>
          <span className="text-sm font-medium text-primary-900">{getAmount(order.shipping_total)}</span>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-700">Taxes</span>
          <span className="text-sm font-medium text-primary-900">{getAmount(order.tax_total)}</span>
        </div>
        
        <div className="border-t border-gray-200 my-4"></div>
        
        <div className="flex items-center justify-between py-2">
          <span className="text-base font-semibold text-primary-900">Total</span>
          <span className="text-lg font-bold text-primary-900">{getAmount(order.total)}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
