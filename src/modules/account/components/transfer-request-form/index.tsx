"use client"

import { useActionState } from "react"
import { createTransferRequest } from "@lib/data/orders"
import { Text, Heading, Input, Button, IconButton, Toaster } from "@medusajs/ui"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { CheckCircleMiniSolid, XCircleSolid } from "@medusajs/icons"
import { useEffect, useState } from "react"

export default function TransferRequestForm() {
  const [showSuccess, setShowSuccess] = useState(false)

  const [state, formAction] = useActionState(createTransferRequest, {
    success: false,
    error: null,
    order: null,
  })

  useEffect(() => {
    if (state.success && state.order) {
      setShowSuccess(true)
    }
  }, [state.success, state.order])

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="grid sm:grid-cols-2 items-start gap-8 w-full">
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-tech-blue/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-tech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-primary-900">
              Order Transfers
            </h3>
          </div>
          <p className="text-gray-600">
            Can&apos;t find the order you are looking for?
            <br /> Connect an order to your account.
          </p>
        </div>
        <form
          action={formAction}
          className="space-y-4"
        >
          <div className="space-y-3">
            <Input 
              className="w-full" 
              name="order_id" 
              placeholder="Enter Order ID" 
            />
            <SubmitButton
              variant="secondary"
              className="w-full px-6 py-2 bg-tech-blue hover:bg-tech-blue/90 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Request Transfer
            </SubmitButton>
          </div>
        </form>
      </div>
      {!state.success && state.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-sm font-medium text-red-800">{state.error}</span>
          </div>
        </div>
      )}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
          <div className="flex justify-between items-start">
            <div className="flex gap-3 items-start">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div className="space-y-1">
                <div className="text-sm font-medium text-green-800">
                  Transfer for order {state.order?.id} requested
                </div>
                <div className="text-sm text-green-700">
                  Transfer request email sent to {state.order?.email}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="text-green-600 hover:text-green-800 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
