"use client"

import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at",
    label: "Latest Arrivals",
    description: "Newest products first"
  },
  {
    value: "price_asc",
    label: "Price: Low to High",
    description: "Budget-friendly options first"
  },
  {
    value: "price_desc",
    label: "Price: High to Low",
    description: "Premium products first"
  },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
    setIsOpen(false)
  }

  const selectedOption = sortOptions.find(option => option.value === sortBy)

  return (
    <div className="relative">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Sort by</h4>
        <p className="text-xs text-gray-600">Organize products by your preference</p>
      </div>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all duration-200"
          data-testid={dataTestId}
        >
          <div className="text-left">
            <div className="font-medium text-gray-900">{selectedOption?.label}</div>
            <div className="text-xs text-gray-600">{selectedOption?.description}</div>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleChange(option.value)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                  option.value === sortBy ? 'bg-tech-blue bg-opacity-5' : ''
                }`}
              >
                <div>
                  <div className={`font-medium ${option.value === sortBy ? 'text-tech-blue' : 'text-gray-900'}`}>
                    {option.label}
                  </div>
                  <div className="text-xs text-gray-600">{option.description}</div>
                </div>
                {option.value === sortBy && (
                  <Check className="w-4 h-4 text-tech-blue" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SortProducts
