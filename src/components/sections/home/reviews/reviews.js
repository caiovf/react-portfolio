import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { CardReview } from '../../../card-review';
import './reviews.scss';
import 'swiper/css';
import 'swiper/css/pagination';

export const Reviews = (props) => {       

    return (
        <section className='section-home reviews'>
            <div className='container'>
                <div className='section-header'>
                    <h2 data-custom-title="section">Reviews</h2>                    
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
                        <CardReview />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardReview />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardReview />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardReview />
                    </SwiperSlide>
                </Swiper>
            </div>                
        </section>    
    );
};