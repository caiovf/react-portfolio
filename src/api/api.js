import axios from 'axios';

const api = axios.create({
  baseURL: 'https://raw.githubusercontent.com/caiovf/react-portfolio/main/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchData = (route) => {
    if (!route) {
        return Promise.reject(new Error('Nenhuma Rota foi Passada'));
    }

    return api.get(`${route}.json`);
}
