"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

// Dados de exemplo para produtos
const PRODUCTS = [
  {
    id: 1,
    name: "Tênis Esportivo Premium",
    price: 299.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Camiseta Básica Algodão",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Relógio Inteligente Pro",
    price: 499.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Fones de Ouvido Bluetooth",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Mochila Impermeável",
    price: 149.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Óculos de Sol Polarizado",
    price: 129.99,
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function ProductGrid() {
  const [products] = useState(PRODUCTS)

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Produto adicionado",
      description: `${productName} foi adicionado ao carrinho.`,
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="aspect-square relative">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium">{product.name}</h3>
            <p className="font-bold mt-2">Kz {product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button onClick={() => handleAddToCart(product.name)} className="w-full">
              Adicionar ao Carrinho
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
