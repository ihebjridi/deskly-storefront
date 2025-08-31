"use client"

import { useState } from "react"
import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("details")

  const tabs = [
    {
      id: "details",
      label: "Details",
      component: <ProductInfoTab product={product} />,
    },
    {
      id: "reviews",
      label: "Reviews",
      component: <ReviewsTab />,
    },
    {
      id: "discussion",
      label: "Discussion",
      component: <DiscussionTab />,
    },
  ]

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-tech-blue border-b-2 border-tech-blue'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-primary-900">Material</span>
            <p className="text-gray-600 mt-1">{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-primary-900">Country of origin</span>
            <p className="text-sm text-gray-600 mt-1">{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-primary-900">Type</span>
            <p className="text-gray-600 mt-1">{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-primary-900">Weight</span>
            <p className="text-gray-600 mt-1">{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-primary-900">Dimensions</span>
            <p className="text-gray-600 mt-1">
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
      
      {product.description && (
        <div className="pt-6 border-t border-gray-100">
          <h3 className="font-semibold text-primary-900 mb-3">Product Description</h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>
      )}
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-body text-gray-600 py-8">
      <div className="grid grid-cols-1 gap-8">
        <div className="flex items-start gap-2">
          <FastDelivery />
          <div>
            <span className="font-semibold text-primary-900">Fast delivery</span>
            <p className="max-w-sm">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Refresh />
          <div>
            <span className="font-semibold text-primary-900">Simple exchanges</span>
            <p className="max-w-sm">
              Is the fit not quite right? No worries - we&apos;ll exchange your
              product for a new one.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Back />
          <div>
            <span className="font-semibold text-primary-900">Easy returns</span>
            <p className="max-w-sm">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ReviewsTab = () => {
  return (
    <div className="space-y-6">
      {/* Review Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-2xl font-bold text-primary-900">4.8</span>
          <span className="text-gray-600">(42 reviews)</span>
        </div>
        
        <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
          <option>Newest</option>
          <option>Oldest</option>
          <option>Highest Rated</option>
          <option>Lowest Rated</option>
        </select>
      </div>

      {/* Review Stats */}
      <div className="grid grid-cols-5 gap-2">
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="text-center">
            <div className="text-sm text-gray-600">{stars} stars</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="bg-yellow-400 h-2 rounded-full" 
                style={{ width: `${stars === 5 ? 67 : stars === 4 ? 20 : stars === 3 ? 10 : stars === 2 ? 2 : 1}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {stars === 5 ? 28 : stars === 4 ? 8 : stars === 3 ? 4 : stars === 2 ? 1 : 1}
            </div>
          </div>
        ))}
      </div>

      {/* Sample Review */}
      <div className="border-t border-gray-100 pt-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">HM</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-primary-900">Helen M.</span>
              <span className="text-sm text-gray-500">Yesterday</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600">
              Amazing product! The quality is outstanding and it fits perfectly. Highly recommend!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const DiscussionTab = () => {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-primary-900 mb-2">Start a Discussion</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Be the first to start a conversation about this product. Share your thoughts, ask questions, or connect with other customers.
        </p>
        <button className="mt-4 px-6 py-3 bg-tech-blue text-white rounded-lg hover:bg-tech-blue/90 transition-colors duration-200">
          Start Discussion
        </button>
      </div>
    </div>
  )
}

export default ProductTabs
