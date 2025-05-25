import 'swiper/swiper-bundle.css';
import './slider.css';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SliderProps {
  images: string[];
}

export const Slider = ({ images }: SliderProps) => {
  return (
    <Swiper
      modules={[Pagination]}
      onSlideChange={() => {
        console.log('slide change');
      }}
      onSwiper={swiper => {
        console.log(swiper);
      }}
      pagination={{ clickable: true }}
      slidesPerView={3}
      spaceBetween={10}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            alt={`Slide ${(index + 1).toString()}`}
            src={image}
            style={{
              width: '100%',
              maxWidth: '250px',
              height: 'auto',
              borderRadius: '15px',
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
