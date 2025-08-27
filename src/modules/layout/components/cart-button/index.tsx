import { retrieveCart } from "@lib/data/cart"
import CartDropDown from "../cart-dropdown"

export default async function CartButton() {
  const cart = await retrieveCart().catch(() => null)

  return <CartDropDown cart={cart} />
}
