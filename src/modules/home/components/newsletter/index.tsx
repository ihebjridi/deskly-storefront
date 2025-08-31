"use client"

import { useState } from "react"
import { Button } from "@medusajs/ui"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the newsletter subscription
    console.log("Subscribing email:", email)
    setIsSubscribed(true)
    setEmail("")
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <section className="py-16 bg-primary-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-tech-blue"></div>
      
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-tech-blue text-white rounded-full text-sm font-medium mb-4">
            🔔 Tech Updates
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Subscribe to Tech News
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Get early access to new tech releases, exclusive deals, and expert reviews. 
            Join over 50,000 tech enthusiasts who rely on Deskly for the latest gadget insights.
          </p>

          {isSubscribed ? (
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Thank you for subscribing! Check your email for confirmation.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-primary-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-tech-blue"
                />
                <Button
                  type="submit"
                  className="px-6 py-3 bg-tech-blue text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-3">
                No spam, unsubscribe at any time. Read our{" "}
                <a href="/privacy" className="text-tech-blue hover:underline">
                  privacy policy
                </a>
              </p>
            </form>
          )}

          {/* Social proof */}
          <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-tech-blue">50k+</div>
              <div className="text-sm text-gray-400">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-tech-blue">Weekly</div>
              <div className="text-sm text-gray-400">Updates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-tech-blue">Exclusive</div>
              <div className="text-sm text-gray-400">Content</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
