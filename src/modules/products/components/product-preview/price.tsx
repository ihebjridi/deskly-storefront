import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <>
      {price.price_type === "sale" && (
        <Text
          className="line-through text-gray-400 text-price-small"
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}
      <Text
        className={clx("text-primary-900", {
          "text-tech-blue": price.price_type === "sale",
        })}
        data-testid="price"
        style={{fontSize: '18px', fontWeight: '700', color: price.price_type === "sale" ? '#007bff' : '#010101'}}
      >
        {price.calculated_price}
      </Text>
    </>
  )
}
