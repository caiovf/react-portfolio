import { useLoaderData } from "react-router";
import { getAllData } from "../utils/data";
import { PageTitle } from "../components/page-title";
import { Reviews } from "../components/sections/home/reviews";
import { Skills } from "../components/sections/home/skills";
import { TextImage } from "../components/text-image";

export function meta() {
  return [
    { title: "About | Caio Ferreira Front End Developer" },
    { name: "description", content: "Saiba mais sobre Caio Ferreira, Front End Developer." },
  ];
}

export async function loader() {
  return await getAllData();
}

export default function About() {
  const { aboutData, skillsData, reviewsData } = useLoaderData();

  const pageTitle = aboutData.page_title || '';
  const pageResumn = aboutData.page_description || '';

  const extractData = (data = {}) => {
    const { title = '', description = '', image = '' } = data;
    return { title, description, image };
  };

  const howWork = extractData(aboutData.how_work);
  const whenNotCoding = extractData(aboutData.when_not_coding);
  const letsWork = extractData(aboutData.lets_work);

  return (
    <>
      <PageTitle title={pageTitle} resumn={pageResumn} />
      <Skills titulo="I Work With" data={skillsData} />
      <TextImage title={howWork.title} description={howWork.description} img={howWork.image} />
      <TextImage
        title={whenNotCoding.title}
        description={whenNotCoding.description}
        img={whenNotCoding.image}
        imgWidth="690"
        imgHeight="600"
        imgAlt=""
        alternate={true}
      />
      <Reviews titulo="What Clients Are Saying" data={reviewsData} />
      <TextImage title={letsWork.title} description={letsWork.description} img={letsWork.image} />
    </>
  );
}
