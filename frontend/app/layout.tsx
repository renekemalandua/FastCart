import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FastCart - Login",
  description: "Faça login para acessar nossa loja online",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  /* const pathname = usePathname();
  const hideHeader = ["/login", "/register"].includes(pathname); */
  return (

    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          {/* {!hideHeader && <Header />} */}
          {children}
        </AuthProvider>
      </body>
    </html>

  )
}
