"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Filters & Sort</span>
          </div>
          {isMobileFiltersOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Filters Overlay */}
      {isMobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="space-y-6">
              <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
              
                          {/* Category Filter */}
            <div className="border-t border-gray-100 pt-6">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Categories</h4>
                <p className="text-xs text-gray-600">Filter by product type</p>
              </div>
              <div className="space-y-3">
                {['Smartphones', 'Laptops', 'Audio', 'Gaming', 'Smart Home'].map((category) => (
                  <label key={category} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-tech-blue border-gray-300 rounded focus:ring-tech-blue focus:ring-2 focus:ring-offset-2" 
                    />
                    <span className="text-sm text-gray-700 group-hover:text-tech-blue transition-colors duration-200 font-medium">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>
              
              {/* Price Range Filter */}
              <div className="border-t border-gray-100 pt-6">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Price Range</h4>
                  <p className="text-xs text-gray-600">Set your budget range</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="2000" 
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="font-medium">$0</span>
                    <span className="text-tech-blue font-semibold">$1000</span>
                    <span className="font-medium">$2000+</span>
                  </div>
                </div>
              </div>
              
              {/* Brand Filter */}
              <div className="border-t border-gray-100 pt-6">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Brands</h4>
                  <p className="text-xs text-gray-600">Choose your preferred brands</p>
                </div>
                <div className="space-y-3">
                  {['Apple', 'Samsung', 'Sony', 'Bose', 'Dell', 'HP'].map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-tech-blue border-gray-300 rounded focus:ring-tech-blue focus:ring-2 focus:ring-offset-2" 
                      />
                      <span className="text-sm text-gray-700 group-hover:text-tech-blue transition-colors duration-200 font-medium">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Filters Sidebar */}
      <div className="hidden lg:block">
                     <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Filters</h3>
            <p className="text-sm text-gray-600">Refine your search results</p>
          </div>
          
          <div className="space-y-6">
            <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
            
            {/* Category Filter */}
            <div className="border-t border-gray-100 pt-6">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Categories</h4>
                <p className="text-xs text-gray-600">Filter by product type</p>
              </div>
              <div className="space-y-3">
                {['Smartphones', 'Laptops', 'Audio', 'Gaming', 'Smart Home'].map((category) => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-tech-blue border-gray-300 rounded focus:ring-tech-blue focus:ring-2 focus:ring-offset-2" 
                    />
                    <span className="text-sm text-gray-700 group-hover:text-tech-blue transition-colors duration-200 font-medium">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="border-t border-gray-100 pt-6">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Price Range</h4>
                <p className="text-xs text-gray-600">Set your budget range</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="2000" 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="font-medium">$0</span>
                  <span className="text-tech-blue font-semibold">$1000</span>
                  <span className="font-medium">$2000+</span>
                </div>
              </div>
            </div>
            
            {/* Brand Filter */}
            <div className="border-t border-gray-100 pt-6">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Brands</h4>
                <p className="text-xs text-gray-600">Choose your preferred brands</p>
              </div>
              <div className="space-y-3">
                {['Apple', 'Samsung', 'Sony', 'Bose', 'Dell', 'HP'].map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-tech-blue border-gray-300 rounded focus:ring-tech-blue focus:ring-2 focus:ring-offset-2" 
                    />
                    <span className="text-sm text-gray-700 group-hover:text-tech-blue transition-colors duration-200 font-medium">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RefinementList
