import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SettingsProvider } from "@/context/settings"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Get FoodCourt",
  description: "An assessment test",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SettingsProvider>{children}</SettingsProvider>
      </body>
    </html>
  )
}
