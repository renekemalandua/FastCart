import { PrismaService } from "./prisma.service";

const prisma = new PrismaService();

type ICreateProductSeed = {
    name: string;
    price: number;
    stock: number;
};

const productsToCreate: ICreateProductSeed[] = [
    {
        name: "Tênis Esportivo Premium",
        price: 299.99,
        stock: 18,
    },
    {
        name: "Camiseta Básica Algodão",
        price: 89.99,
        stock: 7,
    },
    {
        name: "Relógio Inteligente Pro",
        price: 499.99,
        stock: 10,
    },
    {
        name: "Fones de Ouvido Bluetooth",
        price: 199.99,
        stock: 10,
    },
    {
        name: "Mochila Impermeável",
        price: 149.99,
        stock: 12,
    },
    {
        name: "Óculos de Sol Polarizado",
        price: 129.99,
        stock: 5,
    },
];

async function main() {
    for (const product of productsToCreate) {
        await prisma.product.create({
            data: product
        })
    }
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
