import React, { useContext } from 'react';
import './cardPortfolio.scss';
import { Button } from '../button';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../contexts/dataContext';

export const CardPortfolio = (props) => {       
    const navigate = useNavigate();
    const classNames = `card-portfolio ${props.className || ''}`.trim();
    const { state } = useContext(DataContext);
    const categories = state.skillsData;
    const cardCategories = props.categories;
    let filteredCategories = categories.filter(category => cardCategories.includes(category.id));

    const handleClick = () => {
        navigate(`/portfolio/${props.slug}`, { state: { slug: props.slug } });
    };
    
    return (
        <article className={classNames} title={props.title} onClick={handleClick}>
            <div className='categories'>
                {filteredCategories.map((item,index) => (
                    <Button
                        key={index}
                        className="sm-border"
                        iconSrc={`${item.slug}.png`}
                        iconWidth="24"
                        iconHeight="24"
                        iconAlt={`Icone ${item.slug}`}
                        customColor={item.color}
                    />
                ))}
            </div>
            <div className='box-img'>
                <img className='img-cover' loading='lazy' src={props.imgSrc} width={props.imgWidth} height={props.imgHeight} alt={props.imgAlt} />
                <Button
                    className="invert-position"
                    iconSrc="arrow.svg"
                    iconWidth="20"
                    iconHeight="20"
                    iconAlt="Arrow"
                    label="View Project"
                />
            </div>
            <div className='box-text'>
                <h3>{props.title}</h3>
                { props.description && <p>{props.description}</p>}
            </div>
        </article>
        
    );
};