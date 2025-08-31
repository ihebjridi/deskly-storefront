import { redirect } from "next/navigation"
import { retrieveCustomer } from "@lib/data/customer"

export default async function AccountPage() {
  const customer = await retrieveCustomer().catch(() => null)

  // Redirect based on authentication status
  if (!customer) {
    redirect("/account/login")
  } else {
    redirect("/account/dashboard")
  }
}
