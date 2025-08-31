"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)
  }

  return (
    <div className="space-y-8" ref={actionsRef}>
      {/* Price Section */}
      <div className="space-y-4">
        <ProductPrice product={product} variant={selectedVariant} />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Free delivery on orders over $30.0</span>
          </div>
        </div>
      </div>

      {/* Options Selection */}
      {(product.variants?.length ?? 0) > 1 && (
        <div className="space-y-6">
          {/* Color Selection */}
          {product.options?.map((option) => {
            if (option.name?.toLowerCase() === "color") {
              return (
                <div key={option.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary-900">Color</span>
                    <span className="text-sm text-gray-600 capitalize">
                      {options[option.id] || option.values?.[0]?.value}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    {option.values?.map((value) => (
                      <button
                        key={value.id}
                        onClick={() => setOptionValue(option.id, value.value)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                          options[option.id] === value.value
                            ? 'border-tech-blue ring-2 ring-tech-blue/20'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{
                          backgroundColor: value.value.toLowerCase(),
                          // Fallback colors for common color names
                          ...(value.value.toLowerCase() === 'white' && { backgroundColor: '#ffffff' }),
                          ...(value.value.toLowerCase() === 'black' && { backgroundColor: '#000000' }),
                          ...(value.value.toLowerCase() === 'red' && { backgroundColor: '#dc2626' }),
                          ...(value.value.toLowerCase() === 'blue' && { backgroundColor: '#2563eb' }),
                        }}
                      />
                    ))}
                  </div>
                </div>
              )
            }
          })}

          {/* Size Selection */}
          {product.options?.map((option) => {
            if (option.name?.toLowerCase() === "size") {
              return (
                <div key={option.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary-900">Size - EU Men</span>
                    <button className="text-sm text-tech-blue hover:text-tech-blue/80 underline">
                      Size guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {option.values?.map((value) => (
                      <button
                        key={value.id}
                        onClick={() => setOptionValue(option.id, value.value)}
                        className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all duration-200 ${
                          options[option.id] === value.value
                            ? 'bg-primary-900 text-white border-primary-900'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        {value.value}
                      </button>
                    ))}
                  </div>
                </div>
              )
            }
          })}

          {/* Other Options */}
          {product.options?.map((option) => {
            if (option.name?.toLowerCase() !== "color" && option.name?.toLowerCase() !== "size") {
              return (
                <div key={option.id} className="space-y-3">
                  <span className="text-lg font-semibold text-primary-900">Select {option.name}</span>
                  <OptionSelect
                    option={option}
                    current={options[option.id]}
                    updateOption={setOptionValue}
                    title={option.title ?? ""}
                    data-testid="product-options"
                    disabled={!!disabled || isAdding}
                  />
                </div>
              )
            }
          })}
        </div>
      )}

      {/* Add to Cart Section */}
      <div className="space-y-4">
        <Button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          variant="primary"
          className="w-full bg-primary-900 hover:bg-primary-800 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-all duration-200 hover:shadow-lg"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant && !options
            ? "Select variant"
            : !inStock || !isValidVariant
            ? "Out of stock"
            : "Add to cart"}
        </Button>
        
        <div className="flex items-center justify-center gap-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-tech-blue transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm font-medium">Add to wishlist</span>
          </button>
        </div>
      </div>

      {/* Mobile Actions */}
      <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={setOptionValue}
        inStock={inStock}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={!inView}
        optionsDisabled={!!disabled || isAdding}
      />
    </div>
  )
}
