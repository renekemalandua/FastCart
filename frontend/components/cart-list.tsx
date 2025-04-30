"use client"

import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { fastCartApi } from "@/utils/axios"
import { AuthContext } from "@/context/AuthContext"

interface CartItem {
  productId: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartList() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useContext(AuthContext)!;

  const fetchCartItems = async () => {
    try {
      const response = await fastCartApi.get(`/cart/list/${user?.email}`)
      setCartItems(response.data)
    } catch (error) {
      console.error("Erro ao buscar o carrinho:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.email) {
      fetchCartItems()
    }
  }, [user])

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return

    try {
      await fastCartApi.patch("/cart/update", {
        email: user?.email,
        productId,
        newQuantity,
      })

      setCartItems((items) =>
        items.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      )
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error)
    }
  }

  const removeItem = async (productId: number) => {
    try {
      await fastCartApi.delete(`/cart/remove/${user?.email}/${productId}`)
      setCartItems((items) => items.filter((item) => item.productId !== productId))
    } catch (error) {
      console.error("Erro ao remover item:", error)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>Carregando carrinho...</p>
        </CardContent>
      </Card>
    )
  }

  if (cartItems.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Seu carrinho está vazio</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.productId}>
              <div className="flex gap-4">
                <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="font-bold mt-1">Kz {item.price.toFixed(2)}</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.productId)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Separator className="mt-6" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
