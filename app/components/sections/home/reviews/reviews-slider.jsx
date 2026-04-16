import React, { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';
import { CardReview } from '../../../card-review';

// Registra os componentes customizados do Swiper no navegador
register();

/**
 * ReviewsSlider utilizando Swiper Element (Web Components).
 * Esta abordagem é imune a erros de hidratação do React.
 */
export const ReviewsSlider = ({ listReviews }) => {
    const swiperRef = useRef(null);

    useEffect(() => {
        if (!swiperRef.current) return;

        // Configurações complexas via parâmetro (que não funcionam bem como atributos em texto)
        const params = {
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                clickable: true,
                dynamicBullets: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                1300: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                }
            },
            // Injeta os estilos CSS para as bolinhas de paginação aparecerem corretamente no Shadow DOM
            injectStyles: [
                `
                .swiper-pagination-bullet {
                    width: 15px;
                    height: 15px;
                    background: #ff5e3a !important; 
                }
                .swiper-pagination-bullet-active {
                    background: #fff !important;
                }
                `
            ],
        };

        // Atribui os parâmetros ao elemento customizado
        Object.assign(swiperRef.current, params);
        
        // Inicializa manualmente se ainda não tiver sido inicializado automaticamente
        if (!swiperRef.current.initialized) {
            swiperRef.current.initialize();
        }
    }, [listReviews]);

    return (
        <swiper-container
            ref={swiperRef}
            init="false" 
            slides-per-view="1"
            space-between="24"
            loop={listReviews.length > 3 ? "true" : "false"}
            class="reviews-swiper"
        >
            {listReviews.map((item, index) => (
                <swiper-slide key={`review-web-slide-${index}`}>
                    <CardReview data={item} />
                </swiper-slide>
            ))}
        </swiper-container>
    );
};
