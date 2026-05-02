import fs from 'fs';
import { Freemius } from '@freemius/sdk';

const envFile = fs.readFileSync('.env', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        envVars[key.trim()] = value.replace(/"/g, '').trim();
    }
});

const f = new Freemius({
    productId: envVars['FREEMIUS_PRODUCT_ID'],
    apiKey: envVars['FREEMIUS_API_KEY'],
    secretKey: envVars['FREEMIUS_SECRET_KEY'],
    publicKey: envVars['FREEMIUS_PUBLIC_KEY']
});

f.api.product.retrievePricingData()
    .then(data => {
        console.log("PRICING DATA:", JSON.stringify(data, null, 2));
    })
    .catch(console.error);

