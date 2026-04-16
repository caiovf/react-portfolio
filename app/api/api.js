import axios from 'axios';

// Em desenvolvimento, preferimos buscar dados locais para testar mudanças rapidamente.
// Usamos import dinâmico para os JSONs locais na raiz do projeto conforme utils/data.js.
const useLocalData = import.meta.env.DEV;
const remoteBaseURL = 'https://raw.githubusercontent.com/caiovf/react-portfolio/main/api/';

const api = axios.create({
  baseURL: remoteBaseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchData = async (route) => {
    if (!route) {
        return Promise.reject(new Error('Nenhuma Rota foi Passada'));
    }

    if (useLocalData) {
        try {
            // Importa o JSON local da raiz do projeto (mesma lógica de utils/data.js)
            const data = await import(`../../api/${route}.json`);
            // Retorna no formato que o axios retornaria para manter compatibilidade
            return { data: data.default };
        } catch (e) {
            console.warn(`Falha ao carregar dado local para ${route}, tentando remoto...`, e);
        }
    }

    return api.get(`${route}.json`);
}
