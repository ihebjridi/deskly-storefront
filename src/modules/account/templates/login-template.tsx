"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary-900 mb-2">DESKLY</h1>
        <p className="text-gray-600">Premium Tech Store</p>
      </div>
      
                    {/* Toggle Buttons */}
              <div className="flex bg-white rounded-lg p-1 mb-8 shadow-sm border border-gray-200">
        <button
          onClick={() => setCurrentView("sign-in")}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentView === "sign-in"
                      ? "bg-tech-blue text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setCurrentView("register")}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentView === "register"
                      ? "bg-tech-blue text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
        >
          Create Account
        </button>
      </div>
      
      <div className="max-w-md w-full">
        {currentView === "sign-in" ? (
          <Login setCurrentView={setCurrentView} />
        ) : (
          <Register setCurrentView={setCurrentView} />
        )}
      </div>
    </div>
  )
}

export default LoginTemplate
