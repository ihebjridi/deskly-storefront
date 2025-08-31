"use server"

import { retrieveCustomer } from "./customer"
import { listOrders } from "./orders"
import { HttpTypes } from "@medusajs/types"
import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions } from "./cookies"

export interface CustomerStats {
  activeOrders: number
  savedAddresses: number
  paymentMethods: number
  totalOrders: number
  totalSpent: number
  lastOrderDate?: string
}

export const getCustomerStats = async (): Promise<CustomerStats | null> => {
  try {
    // Use the existing retrieveCustomer function to get customer data
    const customer = await retrieveCustomer()
    if (!customer) return null

    // Use the existing listOrders function to get orders
    const orders = await listOrders(100, 0) // Get up to 100 orders for stats
    if (!orders) return null

    // Get customer addresses
    const addresses = await getCustomerAddresses()
    const savedAddresses = addresses.length
    
    // Calculate statistics
    // Active orders (orders that are not completed or cancelled)
    const activeOrders = orders.filter(order => 
      !['completed', 'cancelled', 'refunded'].includes(order.status)
    ).length

    // Total orders
    const totalOrders = orders.length

    // Total spent (sum of completed orders)
    const totalSpent = orders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + (order.total || 0), 0)

    // Last order date
    const lastOrderDate = orders.length > 0 
      ? new Date(Math.max(...orders.map(o => new Date(o.created_at).getTime())))
      : undefined

    // Payment methods (estimate based on orders - in real implementation, you might want to fetch payment methods separately)
    const paymentMethods = orders.length > 0 ? 1 : 0

    return {
      activeOrders,
      savedAddresses,
      paymentMethods,
      totalOrders,
      totalSpent,
      lastOrderDate: lastOrderDate?.toISOString(),
    }
  } catch (error) {
    console.error("Error fetching customer stats:", error)
    return null
  }
}

export const getCustomerOrders = async (limit: number = 5) => {
  try {
    // Use the existing listOrders function
    const orders = await listOrders(limit, 0)
    return orders || []
  } catch (error) {
    console.error("Error fetching customer orders:", error)
    return []
  }
}

export const getCustomerAddresses = async (): Promise<HttpTypes.StoreCustomerAddress[]> => {
  try {
    const headers = await getAuthHeaders()
    if (!headers) return []

    const next = {
      ...(await getCacheOptions("customers")),
    }

    // Fetch customer with addresses
    const customer = await sdk.client
      .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
        method: "GET",
        query: {
          fields: "*addresses",
        },
        headers,
        next,
        cache: "force-cache",
      })
      .then(({ customer }) => customer)
      .catch(() => null)

    return customer?.addresses || []
  } catch (error) {
    console.error("Error fetching customer addresses:", error)
    return []
  }
}
