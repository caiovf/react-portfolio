import axios from 'axios';

// Em desenvolvimento, preferimos dados locais para testar mudanças rapidamente.
// Em produção, buscamos do GitHub conforme configurado originalmente.
const useLocalData = import.meta.env.DEV;
const remoteBaseURL = 'https://raw.githubusercontent.com/caiovf/react-portfolio/main/api/';

export async function fetchData(route) {
  if (useLocalData) {
    // Busca do diretório public/api se estiver lá, ou importamos diretamente
    // Para simplificar o teste local com os arquivos que editei na raiz /api/
    try {
      // Usando import dinâmico para carregar os JSONs locais da raiz do projeto
      const data = await import(`../../api/${route}.json`);
      return data.default;
    } catch (e) {
      console.warn(`Falha ao carregar dado local para ${route}, tentando remoto...`, e);
    }
  }
  
  const response = await axios.get(`${remoteBaseURL}${route}.json`);
  return response.data;
}

export async function getAllData() {
  const [about, categories, projects, reviews] = await Promise.all([
    fetchData('about'),
    fetchData('categories'),
    fetchData('projects'),
    fetchData('reviews'),
  ]);

  const fixPath = (path) => {
    if (typeof path === 'string' && path.startsWith('assets/')) {
      return `/${path}`;
    }
    return path;
  };

  const processedProjects = (projects || []).map(p => ({
    ...p,
    thumbnail: fixPath(p.thumbnail)
  }));

  return {
    aboutData: {
      ...about,
      image: fixPath(about?.image),
      how_work: { ...about?.how_work, image: fixPath(about?.how_work?.image) },
      when_not_coding: { ...about?.when_not_coding, image: fixPath(about?.when_not_coding?.image) },
      lets_work: { ...about?.lets_work, image: fixPath(about?.lets_work?.image) },
    },
    skillsData: categories,
    projectsData: {
      projects: processedProjects.slice(0, 4),
      portfolio: processedProjects.filter(item => item.project_type === 'portfolio'),
      study: processedProjects.filter(item => item.project_type === 'estudo'),
      plugins: processedProjects.filter(item => item.project_type === 'plugin'),
    },
    reviewsData: reviews,
  };
}
