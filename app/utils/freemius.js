import { Freemius } from '@freemius/sdk';

// Initialize the Freemius SDK
// Usamos process.env para puxar as chaves que você configurou no .env
export const freemius = new Freemius({
    productId: process.env.FREEMIUS_PRODUCT_ID,
    apiKey: process.env.FREEMIUS_API_KEY,
    secretKey: process.env.FREEMIUS_SECRET_KEY,
    publicKey: process.env.FREEMIUS_PUBLIC_KEY,
});

// Função utilitária opcional caso você queira testar rapidamente
export async function getFreemiusProduct() {
    try {
        const product = await freemius.api.product.retrieve();
        console.log("Freemius Product Loaded:", product);
        return product;
    } catch (error) {
        console.error("Erro ao puxar dados do Freemius:", error);
        throw error;
    }
}
