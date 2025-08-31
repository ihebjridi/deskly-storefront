"use client"

import { HttpTypes } from "@medusajs/types"
import { User, Package, MapPin, CreditCard, Settings, LogOut, Clock, DollarSign } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getCustomerStats, getCustomerOrders, CustomerStats } from "@lib/data/customer-stats"
import { useEffect, useState } from "react"

type AccountOverviewProps = {
  customer: HttpTypes.StoreCustomer
}

const AccountOverview = ({ customer }: AccountOverviewProps) => {
  const [stats, setStats] = useState<CustomerStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<HttpTypes.StoreOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerStats, orders] = await Promise.all([
          getCustomerStats(),
          getCustomerOrders(3)
        ])
        setStats(customerStats)
        setRecentOrders(orders)
      } catch (error) {
        console.error("Error fetching account data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse mx-auto mb-2 max-w-xs"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto max-w-md"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-6 text-center animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-3"></div>
              <div className="h-8 bg-gray-200 rounded mx-auto mb-1 w-16"></div>
              <div className="h-4 bg-gray-200 rounded mx-auto w-24"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-tech-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-tech-blue" />
        </div>
        <h2 className="text-2xl font-bold text-primary-900 mb-2">
          Welcome back, {customer.first_name || customer.email}!
        </h2>
        <p className="text-gray-600">Here's what's happening with your account</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-tech-blue/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6 text-tech-blue" />
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">
            {stats?.activeOrders || 0}
          </div>
          <div className="text-sm text-gray-600">Active Orders</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-tech-blue/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-6 h-6 text-tech-blue" />
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">
            {stats?.savedAddresses || 0}
          </div>
          <div className="text-sm text-gray-600">Saved Addresses</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-tech-blue/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CreditCard className="w-6 h-6 text-tech-blue" />
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">
            {stats?.paymentMethods || 0}
          </div>
          <div className="text-sm text-gray-600">Payment Methods</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary-900">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LocalizedClientLink
            href="/account/orders"
            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-tech-blue hover:shadow-sm transition-all duration-200 group"
          >
            <div className="w-10 h-10 bg-tech-blue/10 rounded-lg flex items-center justify-center group-hover:bg-tech-blue/20 transition-colors duration-200">
              <Package className="w-5 h-5 text-tech-blue" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-primary-900 group-hover:text-tech-blue transition-colors duration-200">
                View Orders
              </div>
              <div className="text-sm text-gray-600">Track your purchases and order history</div>
            </div>
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/account/addresses"
            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-tech-blue hover:shadow-sm transition-all duration-200 group"
          >
            <div className="w-10 h-10 bg-tech-blue/10 rounded-lg flex items-center justify-center group-hover:bg-tech-blue/20 transition-colors duration-200">
              <MapPin className="w-5 h-5 text-tech-blue" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-primary-900 group-hover:text-tech-blue transition-colors duration-200">
                Manage Addresses
              </div>
              <div className="text-sm text-gray-600">Update shipping and billing addresses</div>
            </div>
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/account/profile"
            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-tech-blue hover:shadow-sm transition-all duration-200 group"
          >
            <div className="w-10 h-10 bg-tech-blue/10 rounded-lg flex items-center justify-center group-hover:bg-tech-blue/20 transition-colors duration-200">
              <Settings className="w-5 h-5 text-tech-blue" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-primary-900 group-hover:text-tech-blue transition-colors duration-200">
                Profile Settings
              </div>
              <div className="text-sm text-gray-600">Update your personal information</div>
            </div>
          </LocalizedClientLink>

          <button className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-sm transition-all duration-200 group text-left">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors duration-200">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-primary-900 group-hover:text-red-600 transition-colors duration-200">
                Sign Out
              </div>
              <div className="text-sm text-gray-600">Securely log out of your account</div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary-900">Recent Activity</h3>
        
        {recentOrders.length > 0 ? (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-tech-blue/10 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-tech-blue" />
                    </div>
                    <div>
                      <div className="font-medium text-primary-900">
                        Order #{order.display_id}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary-900">
                      ${(order.total / 100).toFixed(2)}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </div>
                </div>
                {order.items && order.items.length > 0 && (
                  <div className="text-sm text-gray-600">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            ))}
            <div className="text-center">
              <LocalizedClientLink
                href="/account/orders"
                className="inline-flex items-center px-4 py-2 bg-tech-blue text-white rounded-lg hover:bg-tech-blue/90 transition-colors duration-200"
              >
                View All Orders
              </LocalizedClientLink>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="font-medium text-primary-900 mb-2">No recent activity</h4>
            <p className="text-gray-600 mb-4">Start shopping to see your order history here</p>
            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center px-4 py-2 bg-tech-blue text-white rounded-lg hover:bg-tech-blue/90 transition-colors duration-200"
            >
              Browse Products
            </LocalizedClientLink>
          </div>
        )}
      </div>

      {/* Account Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary-900">Account Information</h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">Full Name</div>
              <div className="text-primary-900">
                {customer.first_name && customer.last_name 
                  ? `${customer.first_name} ${customer.last_name}`
                  : customer.first_name || customer.last_name || 'Not provided'
                }
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">Email</div>
              <div className="text-primary-900">{customer.email}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">Phone</div>
              <div className="text-primary-900">
                {customer.phone || 'Not provided'}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">Member Since</div>
              <div className="text-primary-900">
                {customer.created_at 
                  ? new Date(customer.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : 'Unknown'
                }
              </div>
            </div>
          </div>
          
          {/* Additional Statistics */}
          {stats && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-tech-blue" />
                    <span className="text-sm font-medium text-gray-600">Total Orders</span>
                  </div>
                  <div className="text-2xl font-bold text-primary-900">{stats.totalOrders}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-tech-blue" />
                    <span className="text-sm font-medium text-gray-600">Total Spent</span>
                  </div>
                  <div className="text-2xl font-bold text-primary-900">
                    ${(stats.totalSpent / 100).toFixed(2)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-tech-blue" />
                    <span className="text-sm font-medium text-gray-600">Last Order</span>
                  </div>
                  <div className="text-lg font-semibold text-primary-900">
                    {stats.lastOrderDate 
                      ? new Date(stats.lastOrderDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })
                      : 'Never'
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountOverview
