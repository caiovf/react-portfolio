import React from 'react';
import './portfolio.scss';
import { Button } from '../../../button';
import { CardPortfolio } from '../../../card-portfolio';
import imgPortfolio from '../../../../assets/img/projetos-2.png';
import imgPortfolio2 from '../../../../assets/img/projetos-4.jpg';

export const SectionPortfolio = (props) => {       

    return (
        <section className='section-home portfolio'>
            <div className='container'>
                <div className='section-header'>
                    <h2 data-custom-title="section">{props.titulo}</h2>
                    <Button
                        className="invert-position"
                        iconSrc="arrow.svg"
                        iconWidth="24"
                        iconHeight="24"
                        iconAlt="Arrow"
                        label="View More Projects"
                        navigate="/portfolio"
                    />
                </div>
                <div className='section-content'>                
                    <CardPortfolio 
                        imgSrc={imgPortfolio}
                        imgWidth="922"
                        imgHeight="529"
                        imgAlt="alt mazalti investimentos"
                        title="Mazalti Investimentos"
                        description="Desenvolvi um site moderno e funcional para a Mazalti Investimento, uma consultoria de investimentos, utilizando WordPress e Elementor. O projeto incluiu design responsivo, otimização para SEO e integração de ferramentas de contato e blog, proporcionando uma experiência de usuário intuitiva e profissional para atrair e engajar clientes potenciais.    "
                        categories={[11,12]}
                        slug="mazalti-investimentos"
                    />
                    <CardPortfolio 
                        imgSrc={imgPortfolio2}
                        imgWidth="494"
                        imgHeight="529"
                        imgAlt="alt miogx"
                        title="Miogx"
                        description="Realizei a montagem do site para, utilizando HTML, CSS, JavaScript e WordPress com ACF, destacando portfólios animados e proporcionando uma navegação intuitiva."
                        categories={[1,2,4,11]}
                        slug="miogx"
                        className="portrait"
                    />
                </div>                
            </div>
        </section>    
    );
};