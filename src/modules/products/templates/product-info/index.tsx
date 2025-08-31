import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info" className="space-y-6">
      {/* Brand and Product Name */}
      <div className="space-y-2">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-sm text-gray-600 hover:text-tech-blue transition-colors duration-200 font-medium"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <h1 
          className="text-3xl lg:text-4xl font-bold text-primary-900"
          data-testid="product-title"
        >
          {product.title}
        </h1>
        {product.handle && (
          <p className="text-sm text-gray-500 font-mono">
            Product ID: {product.handle.toUpperCase()}
          </p>
        )}
      </div>

      {/* Rating Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-lg font-semibold text-primary-900">4.8</span>
        <span className="text-gray-600">(42 reviews)</span>
      </div>

      {/* Product Description */}
      {product.description && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-primary-900">Description</h3>
          <p 
            className="text-gray-600 leading-relaxed"
            data-testid="product-description"
          >
            {product.description}
          </p>
        </div>
      )}

      {/* Product Features */}
      {product.tags && product.tags.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-primary-900">Features</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.slice(0, 5).map((tag) => (
              <span 
                key={tag.id} 
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium"
              >
                {tag.value}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductInfo
