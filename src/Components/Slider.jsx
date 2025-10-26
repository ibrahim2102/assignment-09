import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = ({
  slides = [], // array of { id, src, alt, content } or React nodes
  loop = true,
  autoplay = { delay: 3000, disableOnInteraction: false },
  pagination = { clickable: true },
  navigation = true,
  slidesPerView = 1,
  spaceBetween = 10,
  onSlideChange,
  className = '',
}) => {
  const renderSlide = (slide, idx) => {
    if (React.isValidElement(slide)) return <SwiperSlide key={slide.key ?? idx}>{slide}</SwiperSlide>;
    if (typeof slide === 'string') return (
      <SwiperSlide key={idx}>
        <img src={slide} alt={`slide-${idx}`} style={{ width: '100%', display: 'block' }} />
      </SwiperSlide>
    );
    // object with src/content
    return (
      <SwiperSlide key={slide.id ?? idx}>
        {slide.content ? slide.content : <img src={slide.src} alt={slide.alt ?? `slide-${idx}`} style={{ width: '100%', display: 'block' }} />}
      </SwiperSlide>
    );
  };

  return (
    <div className={className} style={{ zIndex: 1 }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={loop}
        autoplay={autoplay}
        pagination={pagination}
        navigation={navigation}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        onSlideChange={onSlideChange}
        style={{ width: '100%' }}
        allowTouchMove={true}
        touchStartPreventDefault={false}
        touchMoveStopPropagation={false}
      >
        {slides.length > 0 ? slides.map(renderSlide) : (
          <>
            <SwiperSlide><div style={{padding:40, textAlign:'center'}}>No slides provided</div></SwiperSlide>
          </>
        )}
      </Swiper>
    </div>
  );
};

export default Slider;