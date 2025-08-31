import { Inter, Work_Sans } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Using Work Sans as a modern geometric sans-serif alternative to Satoshi
// Work Sans has similar characteristics to Satoshi: clean, modern, geometric
export const satoshi = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-satoshi',
  weight: ['400', '500', '600', '700'],
})
