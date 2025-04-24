import ProductGrid from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"


export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Produtos em Destaque</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Todos
          </Button>
          <Button variant="outline" size="sm">
            Novos
          </Button>
          <Button variant="outline" size="sm">
            Promoções
          </Button>
        </div>
      </div>
      <ProductGrid />
    </main>
  )
}
