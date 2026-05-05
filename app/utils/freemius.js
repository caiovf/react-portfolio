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

// Retorna os dados completos de precificação do produto (Planos, Preços, etc)
export async function getFreemiusPlans() {
    try {
        if (!process.env.FREEMIUS_PRODUCT_ID || !process.env.FREEMIUS_SECRET_KEY) {
            console.warn("Chaves do Freemius ausentes no .env. Usando fallback no frontend.");
            return null; // Fallback
        }
        const pricingData = await freemius.api.product.retrievePricingData();
        return pricingData;
    } catch (error) {
        console.error("Erro ao puxar planos do Freemius:", error);
        return null; // Fallback se der erro (ex: API offline ou chave inválida)
    }
}
