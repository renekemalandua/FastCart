import { productSeed } from "./products.seed";

async function main() {
    await productSeed();
    console.log('Seeds executados com sucesso!');
}

export default main;
