"use client"

import type React from "react"

import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthContext } from "@/context/AuthContext"

// Componente de ícone do Google
function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M17.2 8.4 15 10.6l-3-3-5.8 5.8a8 8 0 0 0 13.4-1.2" />
      <path d="M8.4 17.2 10.6 15l-3-3 5.8-5.8a8 8 0 0 0-1.2 13.4" />
    </svg>
  )
}

// Componente de formulário de login
function LoginForm() {
  const [email, setEmail] = useState("");
  const authContext = useContext(AuthContext)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (!authContext) return;
      await authContext.signIn({ email });
      console.log("Usuario Verificado com sucesso")
    } catch (error) {
      console.error("Erro no login:", error)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Bem-vindo</CardTitle>
        <CardDescription className="text-center">Entre para continuar sua jornada de compras</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Continuar
          </Button>
        </form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
          </div>
        </div>
        <Button variant="outline" className="w-full" type="button">
          <GoogleIcon className="mr-2 h-4 w-4" />
          Continuar com o Google
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
        <p>Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.</p>
      </CardFooter>
    </Card>
  )
}

// Página principal de login
export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      {/* Lado esquerdo - Imagem e mensagem */}
      <div className="relative w-full md:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          }}
        />
        <div className="relative z-20 flex flex-col h-[40vh] md:h-full p-8">
          <div className="pt-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">FastCart</h1>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-white max-w-md leading-relaxed">
              Compre de forma rápida. Aqui você encontra o que quer e compra num piscar de olhos.
            </p>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário de login */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <LoginForm />
      </div>
    </main>
  )
}