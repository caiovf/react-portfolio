import React, { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { CardReview } from '../../../card-review';
import './reviews.scss';
import 'swiper/css';
import 'swiper/css/pagination';

export const Reviews = memo((props) => {          
    const listReviews = props.data;
    const title = props.titulo ? props.titulo : '';

    if (!props) {
        return (
            <section className='section-home reviews'>
                <div className='container'>
                    <div className='section-header'>
                        <Skeleton height={62} width={200} count={1} />
                    </div>
                </div>
                <div className='section-content'>                
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={16}
                        slidesPerView={2.5}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        >                        
                            <SwiperSlide>
                                <Skeleton height={205} width={732} count={1} borderRadius="16px" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Skeleton height={205} width={732} count={1} borderRadius="16px" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Skeleton height={205} width={732} count={1} borderRadius="16px" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Skeleton height={205} width={732} count={1} borderRadius="16px" />
                            </SwiperSlide>
                    </Swiper>
                </div>                
            </section>  
        );
    }
    
    return (
        <section className='section-home reviews'>
            <div className='container'>
                <div className='section-header'>
                    <h2 data-custom-title="section">{title}</h2>                    
                </div>
            </div>
            <div className='section-content'>
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={16}
                    slidesPerView={2.5}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    >
                    {listReviews.map((item,index) => (                        
                        <SwiperSlide key={index}>
                            <CardReview                                 
                                data={item}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>                
        </section>    
    );
})