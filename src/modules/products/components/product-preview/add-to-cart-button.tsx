"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { addToCart } from "@lib/data/cart"

type AddToCartButtonProps = {
  productId: string
  variantId: string
  className?: string
}

const AddToCartButton = ({ productId, variantId, className = "" }: AddToCartButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const router = useRouter()
  const params = useParams()
  const countryCode = params?.countryCode as string

  const handleAddToCart = async () => {
    if (isLoading || !countryCode) return
    
    setIsLoading(true)
    try {
      await addToCart({
        variantId,
        quantity: 1,
        countryCode
      })
      setIsAdded(true)
      
      // Reset after 2 seconds
      setTimeout(() => {
        setIsAdded(false)
      }, 2000)
      
      // Refresh the page to update cart count
      router.refresh()
    } catch (error) {
      console.error("Failed to add to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={`p-2 rounded-lg transition-all duration-200 ${
        isAdded 
          ? 'bg-green-500 text-white hover:bg-green-600' 
          : 'bg-tech-blue text-white hover:bg-tech-blue/90 hover:shadow-lg hover:shadow-tech-blue/25'
      } ${className}`}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : isAdded ? (
        <Check className="w-4 h-4" />
      ) : (
        <ShoppingCart className="w-4 h-4" />
      )}
    </button>
  )
}

export default AddToCartButton
