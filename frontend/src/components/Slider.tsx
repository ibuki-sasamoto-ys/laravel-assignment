import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styled from 'styled-components';

// スライダーラッパー（センター寄せ）
const SlideWrap = styled.div`
  margin: 0 auto;
  padding: 2rem 0;
  overflow: hidden;
`;

// Swiperのラップ
const StyledSwiper = styled(Swiper)`
  padding: 0 1rem;

  .swiper-slide {
    width: clamp(250px, 50vw, 480px) !important;
    flex-shrink: 0;
  }

  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    top: 50%;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255);
    border-radius: 50%;
    z-index: 10;

    &::after {
      content: "";
      width: 7px;
      height: 7px;
      border-top: 3px solid #444;
      border-left: 3px solid #444;
    }
  }

  .swiper-button-prev {
    left: calc(50% - 640px - 20px); /* 中央 - 1280/2 - 余白 */

    &::after {
      transform: translateX( 2px ) rotate( -45deg );
    }
  }

  .swiper-button-next {
    right: calc(50% - 640px - 20px);

    &::after {
      transform: translateX( -2px ) rotate( 135deg );
    }
  }

  @media (max-width: 1280px) {
    .swiper-button-prev {
      left: 0.5rem;
    }
    .swiper-button-next {
      right: 0.5rem;
    }
  }
`;

// スライド内の画像
const SlideImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;

// スライダー本体
const Slider: React.FC = () => {
  const slides = [
    { src: '/images/slide1.png', alt: 'スライド1' },
    { src: '/images/slide2.png', alt: 'スライド2' },
    { src: '/images/slide3.png', alt: 'スライド3' },
    { src: '/images/slide1.png', alt: 'スライド1' },
    { src: '/images/slide2.png', alt: 'スライド2' },
    { src: '/images/slide3.png', alt: 'スライド3' },
  ];

  return (
    <SlideWrap>
      <StyledSwiper
        modules={[Navigation]}
        navigation
        loop
        centeredSlides
        centeredSlidesBounds
        slidesPerView="auto"
        spaceBetween={48}
        loopedSlides={6}
        grabCursor
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideImage src={slide.src} alt={slide.alt} />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </SlideWrap>
  );
};

export default Slider;
