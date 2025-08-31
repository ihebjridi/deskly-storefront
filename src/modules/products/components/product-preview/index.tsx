import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heart, Star, Eye } from "lucide-react"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import AddToCartButton from "./add-to-cart-button"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })



  // Mock rating for demonstration (in real app, this would come from product data)
  const rating = 4.5
  const reviewCount = Math.floor(Math.random() * 200) + 50

  return (
    <div data-testid="product-wrapper" className="group">
               <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:scale-[1.01]">
        {/* Product Image */}
        <div className="relative">
          <LocalizedClientLink href={`/products/${product.handle}`}>
            <div className="overflow-hidden">
              <Thumbnail
                thumbnail={product.thumbnail}
                images={product.images}
                size="full"
                isFeatured={isFeatured}
              />
            </div>
          </LocalizedClientLink>
          
          {/* Quick Actions Overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button className="p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg shadow-gray-200/50 hover:bg-white hover:shadow-xl hover:shadow-gray-300/50 transition-all duration-200">
              <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
            </button>
            <button className="p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg shadow-gray-200/50 hover:bg-white hover:shadow-xl hover:shadow-gray-300/50 transition-all duration-200">
              <Eye className="w-4 h-4 text-gray-600 hover:text-tech-blue" />
            </button>
          </div>
          
          {/* Badge */}
          {isFeatured && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-tech-blue text-white">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Title */}
          <LocalizedClientLink href={`/products/${product.handle}`}>
            <h3 
              className="text-lg font-semibold text-primary-900 mb-2 line-clamp-2 hover:text-tech-blue transition-colors duration-200"
              data-testid="product-title"
            >
              {product.title}
            </h3>
          </LocalizedClientLink>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            {cheapestPrice && (
              <div className="flex items-center gap-2">
                <PreviewPrice price={cheapestPrice} />
                {product.original_price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${(product.original_price / 100).toFixed(2)}
                  </span>
                )}
              </div>
            )}
            
            {/* Add to Cart Button */}
            <AddToCartButton 
              productId={product.id}
              variantId={product.variants?.[0]?.id || ""}
            />
          </div>

          {/* Product Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag.id} 
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                >
                  {tag.value}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
