"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { fastCartApi } from "@/utils/axios"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fastCartApi.get("/products");
        const data = await response.data;
        console.log("products: ", data);
        setProducts(data)
      } catch (error) {
        toast({ title: "Erro ao carregar produtos", description: "Tente novamente mais tarde." })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Produto adicionado",
      description: `${productName} foi adicionado ao carrinho.`,
    })
  }

  if (loading) return <p className="text-center w-full">Carregando produtos...</p>

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
