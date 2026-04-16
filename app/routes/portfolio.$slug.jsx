import { useLoaderData } from "react-router";
import { getAllData } from "../utils/data";
import { Button } from "../components/button";
import { CardReview } from "../components/card-review";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { sanitizeHtml } from "@/utils/sanitize";
import "../styles/portfolio-single.scss";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Force HMR to recognize Skeleton import

export async function clientLoader({ params }) {
  const data = await getAllData();
  const project = data.projectsData.portfolio.find(p => p.slug === params.slug) ||
                  data.projectsData.study.find(p => p.slug === params.slug) ||
                  data.projectsData.plugins.find(p => p.slug === params.slug);
  
  if (!project) {
    throw new Response("Not Found", { status: 404 });
  }

  const projectCategories = data.skillsData.filter(category => project.categories.includes(category.id));
  const projectReviews = data.reviewsData.filter(review => review.project_id === project.id);

  return { project, projectCategories, projectReviews };
}

export function meta({ data }) {
  if (!data || !data.project) return [{ title: "Project Not Found" }];
  
  return [
    { title: `${data.project.title} | Caio Ferreira Front End Developer` },
    { name: "description", content: data.project.description },
  ];
}

export default function PortfolioSingle() {
  const { project, projectCategories, projectReviews } = useLoaderData();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const cleanHtml = (text) => {
    return sanitizeHtml(text, {
      ALLOWED_ATTR: ['href', 'target', 'rel'],
    });
  };

  return (
    <>
      <section className='single-banner'>
        <div className='container'>
          {project.thumbnail && (
            <div className='box-img'>
              <img className='img-responsive' src={project.thumbnail} width="1440" height="826" alt={`Imagem do projeto ${project.title}`} />
            </div>
          )}
          <div className='box-text'>
            <h1>{project.title}</h1>
            {project.description && (
              <div className='resume'>
                <p>{project.description}</p>
              </div>
            )}
            {project.text && (
              <div className='text'>
                <p dangerouslySetInnerHTML={{ __html: cleanHtml(project.text) }}></p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <section className='section-home tools-used'>
        <div className='container'>
          <div className='section-header'>
            <h2 data-custom-title="section">Tools Used</h2>
            {(project.link_project || project.link_github) && (
              <div className='list-buttons'>
                {project.link_project && (
                  <Button
                    className="invert-position"
                    iconSrc={project.current_online ? "arrow-dg.svg" : "offline.svg"}
                    iconWidth="24"
                    iconHeight="24"
                    iconAlt="Arrow"
                    label={project.current_online ? "View Project" : "Project Offline"}
                    link={project.current_online ? project.link_project : '' }
                    newTab
                  />
                )}
                {project.link_github && (
                  <Button
                    className="invert-position"
                    iconSrc="arrow-dg.svg"
                    iconWidth="24"
                    iconHeight="24"
                    iconAlt="Arrow"
                    label="GitHub Code"
                    link={project.link_github}
                    newTab
                  />
                )}
              </div>
            )}
          </div>
          <div className='section-content'>
            {projectCategories.map((item, index) => (
              <Button
                key={index}
                iconSrc={`${item.slug}.png`}
                iconWidth="24"
                iconHeight="24"
                iconAlt={`Icone ${item.slug}`}
                label={item.name}
                customColor={item.color}
              />
            ))}
          </div>
        </div>
      </section>

      {projectReviews.length > 0 && (
        <section className='reviews single'>
          <div className='container'>
            <div className='section-header'>
              <h2 data-custom-title="section">Reviews</h2>
            </div>
            {isClient ? (
              <Swiper
                modules={[Pagination]}
                spaceBetween={8}
                slidesPerView={1}
                pagination={{ clickable: true, dynamicBullets: true }}
                observer={true}
                observeParents={true}
              >
                {projectReviews.map((item, index) => (
                  <SwiperSlide key={index}>
                    <CardReview data={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div style={{ height: 205 }} />
            )}
          </div>
        </section>
      )}
    </>
  );
}
