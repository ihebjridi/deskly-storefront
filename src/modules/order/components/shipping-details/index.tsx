import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-tech-blue/10 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-tech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-primary-900">Shipping Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="space-y-2"
          data-testid="shipping-address-summary"
        >
          <h4 className="text-sm font-medium text-gray-700">Shipping Address</h4>
          <div className="text-sm text-gray-900">
            <div>{order.shipping_address?.first_name} {order.shipping_address?.last_name}</div>
            <div>{order.shipping_address?.address_1}</div>
            {order.shipping_address?.address_2 && <div>{order.shipping_address.address_2}</div>}
            <div>{order.shipping_address?.postal_code}, {order.shipping_address?.city}</div>
            <div>{order.shipping_address?.country_code?.toUpperCase()}</div>
          </div>
        </div>

        <div
          className="space-y-2"
          data-testid="shipping-contact-summary"
        >
          <h4 className="text-sm font-medium text-gray-700">Contact</h4>
          <div className="text-sm text-gray-900">
            {order.shipping_address?.phone && <div>{order.shipping_address.phone}</div>}
            <div>{order.email}</div>
          </div>
        </div>

        <div
          className="space-y-2"
          data-testid="shipping-method-summary"
        >
          <h4 className="text-sm font-medium text-gray-700">Shipping Method</h4>
          <div className="text-sm text-gray-900">
            <div>{(order as any).shipping_methods[0]?.name}</div>
            <div className="font-medium">
              {convertToLocale({
                amount: order.shipping_methods?.[0].total ?? 0,
                currency_code: order.currency_code,
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
