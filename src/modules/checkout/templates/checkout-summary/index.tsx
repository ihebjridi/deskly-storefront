import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { Badge } from "@modules/common/components/ui/badge"
import { Separator } from "@modules/common/components/ui/separator"
import { ShoppingBag, Package, CreditCard, Truck } from "lucide-react"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  const itemCount = cart?.items?.length || 0

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ShoppingBag className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>
            <p className="text-sm text-muted-foreground">
              Review your items and totals
            </p>
          </div>
        </div>

        {/* Item Count Badge */}
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-sm">
            {itemCount} item{itemCount !== 1 ? 's' : ''} in cart
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Cart Totals */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Order Details</h3>
        <CartTotals totals={cart} />
      </div>

      <Separator />

      {/* Items Preview */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Items in Cart</h3>
        <div className="max-h-64 overflow-y-auto">
          <ItemsPreviewTemplate cart={cart} />
        </div>
      </div>

      <Separator />

      {/* Discount Code */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Discounts & Promotions</h3>
        <DiscountCode cart={cart} />
      </div>

      <Separator />

      {/* Shipping Info */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Shipping Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Free shipping on orders over CAD $75</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">3-5 business days delivery</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Payment Security */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Payment Security</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Secure payment processing</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">30-day return policy</span>
          </div>
        </div>
      </div>

      {/* Order Total Highlight */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">Total Amount</span>
          <span className="text-lg font-bold text-foreground">
            CAD ${cart?.total ? (cart.total / 100).toFixed(2) : '0.00'}
          </span>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Final amount including taxes and shipping
        </p>
      </div>
    </div>
  )
}

export default CheckoutSummary
