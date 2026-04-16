import { useLoaderData, useParams, useLocation } from "react-router";
import { getAllData } from "../utils/data";
import { PageTitle } from "../components/page-title";
import { List } from "../components/sections/work-section/list";

export function meta({ data, params, location }) {
  // We can determine the title based on the path
  let pageTitle = "Portfolio";
  if (location.pathname.includes("advancing-skills")) {
    pageTitle = "Advancing my Skills";
  }
  
  return [
    { title: `${pageTitle} | Caio Ferreira Front End Developer` },
    { name: "description", content: "Explore meus projetos e habilidades." },
  ];
}

export async function clientLoader() {
  return await getAllData();
}

export default function Portfolio() {
  const data = useLoaderData();
  const { category } = useParams();
  const location = useLocation();
  
  const selectedCategory = category || (location.pathname.includes("advancing-skills") ? "advancing-skills" : "portfolio");
  
  const { skillsData, projectsData } = data;
  let portfolioData = projectsData.projects;
  let pageTitle = "Portfolio";
  let pageResumn = "Explore all of my projects, both real and study-based. This section offers a comprehensive view of my work, highlighting my skills across various technologies and creative approaches. <a href='/portfolio' title='Want to see only real projects? Explore them here'>Want to see only real projects? Explore them here.</a>";

  const getCategoryBySlug = (slug) => skillsData.find(s => s.slug === slug);
  const categoryObject = category ? getCategoryBySlug(category) : null;
  const { id: categoryId = '', name: categoryName = '' } = categoryObject || {};

  if (selectedCategory === 'advancing-skills' || selectedCategory === 'portfolio') {
    portfolioData = (selectedCategory === 'advancing-skills') ? projectsData.study : projectsData.portfolio;
    pageTitle = (selectedCategory === 'advancing-skills') ? 'Advancing my Skills' : "Portfolio";
    pageResumn = (selectedCategory === 'advancing-skills') 
      ? 'Explore my portfolio to discover projects that highlight my continuous learning and skills development, featuring React, WordPress, and more. Want to see how these skills are applied in real-world scenarios? <a href="/portfolio" title="Check out my full portfolio">Check out my full portfolio</a>.' 
      : "Explore my work to see a range of projects utilizing HTML, CSS, JavaScript, jQuery, PHP, and WordPress. Ready to build something amazing together? <a href='https://www.linkedin.com/in/caio-ferreiradev/' title=\"Let's get started!\" target='_blank' rel='nofollow noopener noreferrer'>Let's get started!</a>";
  }

  if (category) {
    pageTitle = `${pageTitle} - ${categoryName}`;
  }

  const AllSkills = skillsData.filter(skill => 
    portfolioData.some(project => project.categories.includes(skill.id))
  );

  return (
    <>
      <PageTitle title={pageTitle} resumn={pageResumn} />
      <List 
        skills={AllSkills}
        projects={portfolioData}
        categoryFilter={categoryId} 
      />
    </>
  );
}
