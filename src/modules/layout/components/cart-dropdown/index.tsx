"use client"

import { useState, useEffect, useTransition } from "react"
import { ShoppingCart, Plus, Minus, Trash2, X, Loader2 } from "lucide-react"
import { Button } from "@modules/common/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@modules/common/components/ui/popover"
import { Badge } from "@modules/common/components/ui/badge"
import { Separator } from "@modules/common/components/ui/separator"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import { updateLineItem, deleteLineItem, retrieveCart } from "@lib/data/cart"

interface CartDropDownProps {
  cart: HttpTypes.StoreCart | null
  region?: HttpTypes.StoreRegion
}

export default function CartDropDown({ cart: initialCart, region }: CartDropDownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(initialCart)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Refresh cart data when popover opens
  useEffect(() => {
    if (isOpen && cart?.id) {
      const refreshCart = async () => {
        try {
          const updatedCart = await retrieveCart(cart.id)
          if (updatedCart) {
            setCart(updatedCart)
          }
        } catch (error) {
          console.error("Failed to refresh cart:", error)
        }
      }
      refreshCart()
    }
  }, [isOpen, cart?.id])

  const totalItems = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
  const totalPrice = cart?.total || 0
  const subtotal = cart?.subtotal || 0
  const taxTotal = cart?.tax_total || 0
  const discountTotal = cart?.discount_total || 0

  const handleUpdateQuantity = async (lineItemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(lineItemId)
      return
    }

    setIsUpdating(lineItemId)
    
    startTransition(async () => {
      try {
        await updateLineItem({
          lineId: lineItemId,
          quantity,
        })
        
        // Refresh cart after update
        if (cart?.id) {
          const updatedCart = await retrieveCart(cart.id)
          if (updatedCart) {
            setCart(updatedCart)
          }
        }
      } catch (error) {
        console.error("Failed to update item quantity:", error)
        // You can add toast notification here
      } finally {
        setIsUpdating(null)
      }
    })
  }

  const handleRemoveItem = async (lineItemId: string) => {
    setIsUpdating(lineItemId)
    
    startTransition(async () => {
      try {
        await deleteLineItem(lineItemId)
        
        // Refresh cart after removal
        if (cart?.id) {
          const updatedCart = await retrieveCart(cart.id)
          if (updatedCart) {
            setCart(updatedCart)
          }
        }
      } catch (error) {
        console.error("Failed to remove item:", error)
        // You can add toast notification here
      } finally {
        setIsUpdating(null)
      }
    })
  }

  const formatPrice = (amount: number) => {
    if (!region?.currency_code) {
      return `$${(amount / 100).toFixed(2)}`
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: region.currency_code.toUpperCase(),
    }).format(amount / 100)
  }

  const getImageUrl = (item: HttpTypes.StoreCartLineItem) => {
    // Use the thumbnail from the item if available, otherwise fallback to product images
    return item.thumbnail || 
           item.product?.thumbnail || 
           item.product?.images?.[0]?.url ||
           "/placeholder-product.jpg"
  }

  const getVariantTitle = (item: HttpTypes.StoreCartLineItem) => {
    if (item.variant_title && item.variant_title !== "Default") {
      return item.variant_title
    }
    return null
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-muted/80 transition-colors"
          data-testid="cart-trigger"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-primary animate-pulse">
              {totalItems}
            </Badge>
          )}
          <span className="sr-only">Cart</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 shadow-xl border-0 bg-white/95 backdrop-blur-sm" align="end">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Shopping Cart</h3>
              <p className="text-sm text-muted-foreground">
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Updating...
                  </span>
                ) : (
                  `${totalItems} ${totalItems === 1 ? 'item' : 'items'} in cart`
                )}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 hover:bg-white/80"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Content */}
        {!cart?.items?.length ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h4 className="font-medium mb-2">Your cart is empty</h4>
            <p className="text-sm text-muted-foreground mb-6">Discover amazing products and add them to your cart</p>
            <LocalizedClientLink href="/store">
              <Button className="w-full" onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Button>
            </LocalizedClientLink>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="max-h-80 overflow-y-auto">
              {cart.items.map((item) => (
                <div key={item.id} className="p-4 border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0 border">
                      <Image
                        src={getImageUrl(item)}
                        alt={item.title || "Product"}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate mb-1">{item.title}</h4>
                      {getVariantTitle(item) && (
                        <p className="text-xs text-muted-foreground mb-2">{getVariantTitle(item)}</p>
                      )}
                      
                      {/* Quantity Controls & Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 rounded-full"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={isUpdating === item.id || isPending}
                          >
                            {isUpdating === item.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Minus className="h-3 w-3" />
                            )}
                          </Button>
                          <span className="text-sm font-medium min-w-[2ch] text-center bg-muted/50 px-2 py-1 rounded">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 rounded-full"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={isUpdating === item.id || isPending}
                          >
                            {isUpdating === item.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Plus className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <p className="text-sm font-semibold">
                              {formatPrice(item.total || 0)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-muted-foreground">
                                {formatPrice(item.unit_price || 0)} each
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={isUpdating === item.id || isPending}
                          >
                            {isUpdating === item.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Trash2 className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cart Summary */}
            <div className="p-6 border-t bg-gradient-to-r from-muted/30 to-muted/50">
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountTotal > 0 && (
                  <div className="flex items-center justify-between text-sm text-green-600">
                    <span>Discount:</span>
                    <span>-{formatPrice(discountTotal)}</span>
                  </div>
                )}
                {taxTotal > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span>Tax:</span>
                    <span>{formatPrice(taxTotal)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between font-semibold">
                  <span>Total:</span>
                  <span className="text-lg">{formatPrice(totalPrice)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <LocalizedClientLink href="/cart" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-white transition-colors" 
                    onClick={() => setIsOpen(false)}
                  >
                    View Full Cart
                  </Button>
                </LocalizedClientLink>
                <LocalizedClientLink href="/checkout" className="w-full">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all shadow-md" 
                    onClick={() => setIsOpen(false)}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Proceed to Checkout"
                    )}
                  </Button>
                </LocalizedClientLink>
              </div>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}