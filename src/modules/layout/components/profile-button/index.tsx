
// ProfileButton.tsx - Server Component Wrapper
import { retrieveCustomer } from "@lib/data/customer"
import ProfileDropDown from "../profile-dropdown"

export default async function ProfileButton() {
  const customer = await retrieveCustomer()
  
  return <ProfileDropDown customer={customer} />
}
