import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css";
import Header from "@/components/header"
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FastCart - E-commerce",
  description: "Uma loja online",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider><Header />
      {children}
    </AuthProvider>
  )
}
