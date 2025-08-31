import { HttpTypes } from "@medusajs/types"

import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  currencyCode: string
}

const Item = ({ item, currencyCode }: ItemProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg" data-testid="product-row">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden">
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4
          className="text-sm font-medium text-primary-900 mb-1"
          data-testid="product-name"
        >
          {item.product_title}
        </h4>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />
      </div>

      {/* Product Pricing */}
      <div className="flex flex-col items-end text-right">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-sm text-gray-600" data-testid="product-quantity">
            {item.quantity}
          </span>
          <span className="text-sm text-gray-600">×</span>
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </div>

        <LineItemPrice
          item={item}
          style="tight"
          currencyCode={currencyCode}
        />
      </div>
    </div>
  )
}

export default Item
