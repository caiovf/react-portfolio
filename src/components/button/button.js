import React from 'react';
import './button.scss';
import { useNavigate } from 'react-router-dom';

export const Button = (props) => {
    const navigate = useNavigate(); 
    const imageSrc = require(`../../assets/img/icons/${props.iconSrc}`);
    const ButtonTag = props.link ? 'a' : 'button';
    const classNames = `button ${props.className || ''}`.trim();      
    
    // Função de manipulação de clique
    const handleClick = (e) => {
        if (props.navigate) {
            e.preventDefault();
            navigate(props.navigate, { state: { filter: props.value } });
        }
        
        if (props.onClick) {
            props.onClick(e);
        }
    };

    const linkProps = props.link ? {
        title: props.label,
        href: props.link,        
        ...(props.newTab && { target:'_blank', rel: 'nofollow noopener noreferrer' }),
        ...(props.download && { download: '' })
    } : {};

    const buttonProps = {
        className: `button ${props.className || ''}`,
        ...(props.customColor && { style: {background: props.customColor} }),
        'aria-label': props.label,
        onClick: handleClick
    };

    return (
        <ButtonTag className={classNames} {...linkProps} {...buttonProps}>
            {props.iconSrc && <div className='icon'>
                <img className='img-responsive' src={imageSrc} width={props.iconWidth} height={props.iconHeight} alt={props.iconAlt} />
            </div>}
            {props.label && <span>{props.label}</span>}            
        </ButtonTag>
    );    
};