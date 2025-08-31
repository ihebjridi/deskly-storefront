import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { satoshi } from "@lib/fonts"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body className={satoshi.variable}>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
