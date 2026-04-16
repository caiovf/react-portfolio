import { useLoaderData } from "react-router";
import { getAllData } from "../utils/data";
import { PageTitle } from "../components/page-title";
import { List } from "../components/sections/work-section/list";

export function meta() {
  return [
    { title: "Plugins | Caio Ferreira Front End Developer" },
    { name: "description", content: "Explore my custom plugins for WordPress and other platforms." },
  ];
}

export async function loader() {
  return await getAllData();
}

export default function Plugins() {
  const data = useLoaderData();
  const { skillsData, projectsData } = data;
  
  const pluginsData = projectsData.plugins;
  const pageTitle = "Plugins";
  const pageResumn = "Explore my custom plugins focused on productivity, AI, and WordPress enhancements. The first one is <strong>VoxAI</strong>, a powerful tool for content creators.";

  // Filtra as skills que estão sendo usadas nos plugins
  const AllSkills = skillsData.filter(skill => 
    pluginsData.some(project => project.categories.includes(skill.id))
  );

  return (
    <>
      <PageTitle title={pageTitle} resumn={pageResumn} />
      <List 
        skills={AllSkills}
        projects={pluginsData}
        basePath="plugins"
      />
    </>
  );
}
