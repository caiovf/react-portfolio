import { useLoaderData } from "react-router";
import { getAllData } from "../utils/data";
import { Profile } from "../components/sections/home/profile";
import { Skills } from "../components/sections/home/skills";
import { SectionPortfolio } from "../components/sections/home/projects-section";
import { Reviews } from "../components/sections/home/reviews";

export function meta() {
  return [
    { title: "Home | Caio Ferreira Front End Developer" },
    { name: "description", content: "Portfolio of Caio Ferreira, Front End Developer." },
  ];
}

export async function loader() {
  return await getAllData();
}

export default function Home() {
  const data = useLoaderData();
  
  const { aboutData, skillsData, projectsData, reviewsData } = data;

  return (
    <>
      <Profile 
        data={aboutData}
        title={aboutData.title}
        description={aboutData.description}
        img={aboutData.image}
      />
      <Skills 
        titulo="Skills"
        data={skillsData}
      />
      <SectionPortfolio 
        titulo="Portfolio"
        data={projectsData.portfolio.slice(0, 4)}
      />
      <Reviews
        titulo="Reviews" 
        data={reviewsData}
      />
      <SectionPortfolio 
        titulo="Advancing my skills"
        type="advancing-skills"
        data={projectsData.study.slice(0, 4)}        
      />
    </>
  );
}
