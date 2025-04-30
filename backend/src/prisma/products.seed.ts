import { PrismaService } from "./prisma.service";

const prisma = new PrismaService();

type ICreateProductSeed = {
    name: string;
    price: number;
    stock: number;
};

const productsToCreate: ICreateProductSeed[] = [
    {
        name: "Caderno Universitário 200 folhas",
        price: 1200,
        stock: 50,
    },
    {
        name: "Estojo Escolar com Zíper",
        price: 850,
        stock: 75,
    },
    {
        name: "Mochila Escolar Infantil",
        price: 5200,
        stock: 30,
    },
    {
        name: "Conjunto de Lápis de Cor (24 unidades)",
        price: 2100,
        stock: 60,
    },
    {
        name: "Apontador com Depósito",
        price: 400,
        stock: 100,
    },
    {
        name: "Borracha Escolar Branca",
        price: 250,
        stock: 120,
    },
    {
        name: "Régua Plástica 30cm",
        price: 600,
        stock: 80,
    },
    {
        name: "Tesoura Escolar Sem Ponta",
        price: 900,
        stock: 45,
    },
    {
        name: "Cola Branca 90g",
        price: 500,
        stock: 70,
    },
    {
        name: "Bloco de Desenho A4",
        price: 1500,
        stock: 40,
    },
    {
        name: "Canetas Esferográficas (Kit com 5)",
        price: 800,
        stock: 90,
    },
    {
        name: "Transferidor Escolar 180°",
        price: 300,
        stock: 85,
    },
];

export async function productSeed() {
    const productCount = await prisma.product.count();
    if (productCount === 0) {
        for (const product of productsToCreate) {
            await prisma.product.create({
                data: product
            })
        }
    }
}