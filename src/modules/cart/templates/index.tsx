import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-tech-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-tech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-primary-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">Review your items and proceed to checkout</p>
      </div>

      {/* Cart Content */}
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            {/* Cart Items */}
            <div className="space-y-6">
              {!customer && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <SignInPrompt />
                </div>
              )}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <ItemsTemplate cart={cart} />
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="relative">
              <div className="sticky top-12">
                {cart && cart.region && (
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <Summary cart={cart as any} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
