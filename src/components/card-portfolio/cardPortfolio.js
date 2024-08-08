import React from 'react';
import './cardPortfolio.scss';
import { Button } from '../button';
import { useNavigate } from 'react-router-dom';

export const CardPortfolio = (props) => {       
    const navigate = useNavigate();
    const classNames = `card-portfolio ${props.className || ''}`.trim();

    const handleClick = () => {
        navigate(`/portfolio/${props.slug}`);
      };
    
    return (
        <article className={classNames} title={props.title} onClick={handleClick}>
            <div className='categories'>
                <Button
                    className="sm-border"
                    iconSrc="html.png"
                    iconWidth="24"
                    iconHeight="24"
                    iconAlt="Html"
                    customColor="#FF4B00"
                />
                <Button
                    className="sm-border"
                    iconSrc="css.png"
                    iconWidth="24"
                    iconHeight="24"
                    iconAlt="Css"
                    customColor="#2196F3"
                />
            </div>
            <div className='box-img'>
                <img className='img-cover' src={props.imgSrc} width={props.imgWidth} height={props.imgHeight} alt={props.imgAlt} />
                <Button
                    className="invert-position"
                    iconSrc="arrow.svg"
                    iconWidth="20"
                    iconHeight="20"
                    iconAlt="Arrow"
                    label="View Project"
                    navigate="/portfolio"
                />
            </div>
            <div className='box-text'>
                <h3>{props.title}</h3>
                { props.description && <p>{props.description}</p>}
            </div>
        </article>
        
    );
};