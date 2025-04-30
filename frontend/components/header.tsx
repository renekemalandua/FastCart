"use client"

import { useContext, useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { AuthContext } from "@/context/AuthContext"

export default function Header() {
  const [cartCount, setCartCount] = useState(4);
  const { signOut, user } = useContext(AuthContext)!;
  
  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/home" className="font-bold text-xl mr-4">
            FastCart
          </Link>

          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar produtos..." className="pl-10 w-full" />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline-block">{user?.email}</span>

            <Link href="/carrinho" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Visualizar Perfil</DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>Terminar Sessão</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
