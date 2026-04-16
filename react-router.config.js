import axios from 'axios';
import { index, route } from "@react-router/dev/routes";
import { vercelPreset } from '@vercel/react-router/vite';

export default {
  // Configuração para SSG (Static Site Generation)
  ssr: true,
  presets: [vercelPreset()],
  async prerender() {
    const baseURL = 'https://raw.githubusercontent.com/caiovf/react-portfolio/main/api/';
    const routes = ["/", "/about", "/portfolio", "/advancing-skills", "/plugins"];
    
    try {
      const response = await axios.get(`${baseURL}projects.json`);
      const projects = response.data;
      const projectRoutes = projects.map(project => `/portfolio/${project.slug}`);
      const categoriesResponse = await axios.get(`${baseURL}categories.json`);
      const categories = categoriesResponse.data;
      const categoryRoutes = categories.map(cat => `/portfolio/category/${cat.slug}`);

      return [...routes, ...projectRoutes, ...categoryRoutes];
    } catch (error) {
      console.error("Erro ao buscar rotas para prerender:", error);
      return routes;
    }
  },
};
