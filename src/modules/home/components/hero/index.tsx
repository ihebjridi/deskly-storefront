"use client"

import { Smartphone, Laptop, Home, Headphones, Gamepad2 } from "lucide-react"
import { Button, Heading } from "@medusajs/ui"
import { useState, useEffect } from "react"

const Hero = () => {
  const [currentProduct, setCurrentProduct] = useState(0)

  const products = [
    {
      name: "Smartphones",
      description: "Latest mobile technology",
      details: "iPhone, Samsung, Google Pixel",
      icon: <Smartphone className="w-12 h-12" />,
      color: "text-tech-blue",
      badge: "Best Sellers"
    },
    {
      name: "Laptops",
      description: "High-performance computing",
      details: "MacBook, Dell, HP, Lenovo", 
      icon: <Laptop className="w-12 h-12" />,
      color: "text-tech-blue",
      badge: "Pro Choice"
    },
    {
      name: "Smart Home",
      description: "IoT & home automation",
      details: "Alexa, Google Home, Smart Lights",
      icon: <Home className="w-12 h-12" />,
      color: "text-tech-blue",
      badge: "Trending"
    },
    {
      name: "Audio",
      description: "Premium sound equipment",
      details: "AirPods, Sony, Bose, JBL",
      icon: <Headphones className="w-12 h-12" />,
      color: "text-tech-blue",
      badge: "Premium"
    },
    {
      name: "Gaming",
      description: "Gaming peripherals & gear",
      details: "Controllers, Keyboards, Mice",
      icon: <Gamepad2 className="w-12 h-12" />,
      color: "text-tech-blue",
      badge: "New"
    }
  ]

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % products.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [products.length])

  return (
            <div className="relative overflow-hidden bg-gray-50">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Heading
                level="h1"
                className="text-4xl lg:text-6xl font-bold text-primary-900 leading-tight"
              >
                Discover Your
                <span className="block text-tech-blue">Next Tech Upgrade</span>
              </Heading>
              
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
                Cutting-edge electronics and smart gadgets that power your digital life. 
                Experience innovation, performance, and reliability in every device.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="btn-primary inline-flex items-center justify-center px-8 py-4 text-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                Shop Electronics
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              
              <Button 
                variant="secondary"
                className="btn-secondary inline-flex items-center justify-center px-8 py-4 text-lg font-semibold"
              >
                Tech Reviews
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 011.5 1.5v1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-900">50k+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-900">4.9</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-900">1000+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
            </div>
          </div>

          {/* Right content - Product Carousel */}
          <div className="relative">
            <div className="aspect-square bg-gray-50 rounded-lg p-8 overflow-hidden">
              {/* Carousel Container */}
              <div className="h-full relative">
                <div 
                  className="flex transition-transform duration-700 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentProduct * 100}%)` }}
                >
                  {products.map((product, index) => (
                    <div 
                      key={index}
                      className="min-w-full h-full flex flex-col justify-between text-center px-4 py-6"
                    >
                      {/* Top section - Badge */}
                      <div className="flex justify-center mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-tech-blue text-white">
                          {product.badge}
                        </span>
                      </div>
                      
                      {/* Middle section - Icon and main content */}
                      <div className="flex-1 flex flex-col justify-center">
                        {/* Product Icon */}
                        <div className="mb-6">
                          <div className={`w-24 h-24 bg-white rounded-3xl flex items-center justify-center ${product.color} mx-auto border border-gray-200 shadow-sm`}>
                            {product.icon}
                          </div>
                        </div>
                        
                        {/* Product Info */}
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-primary-900">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-base">
                            {product.description}
                          </p>
                          <p className="text-gray-500 text-sm leading-relaxed">
                            {product.details}
                          </p>
                        </div>
                      </div>
                      

                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Dots - Positioned at bottom */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-2">
                  {products.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProduct(index)}
                      className={`h-2 rounded-full transition-all duration-500 ease-out ${
                        index === currentProduct 
                          ? 'bg-tech-blue w-8' 
                          : 'bg-gray-300 w-2 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Subtle Progress Ring */}
            <div className="absolute top-4 right-4">
              <div className="relative w-8 h-8">
                <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    className="text-tech-blue transition-all duration-700 ease-linear"
                    style={{
                      strokeDasharray: `${2 * Math.PI * 14}`,
                      strokeDashoffset: `${2 * Math.PI * 14 * (1 - (currentProduct + 1) / products.length)}`,
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-500">
                    {currentProduct + 1}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
