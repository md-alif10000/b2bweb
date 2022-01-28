import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import styles from "../../styles/components/SuccessSlider.module.css";

// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Pagination, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination, Autoplay]);

const SuccessSlider = () => {
  return (
    <div>
      <>
        <Swiper
        centeredSlides={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,

            slideShadows: true,
          }}
          pagination={true}
          className={styles.swiper}
        >
          <div className={styles.slideContainer}>
            <SwiperSlide>
              <video src="/videos/video1.mp4" autoPlay={true}  loop={true}></video>
            </SwiperSlide>
          </div>

          <div className={styles.slideContainer}>
            <SwiperSlide>
              <video src="/videos/video2.mp4" autoPlay={true} controls={true}   loop={true}></video>
            </SwiperSlide>
          </div>
          <div className={styles.slideContainer}>
            <SwiperSlide>
              <video src="/videos/video3.mp4" autoPlay={true} controls={true}  loop={true}></video>
            </SwiperSlide>
          </div>

          <div className={styles.slideContainer}>
            <SwiperSlide>
              <video src="/videos/video4.mp4" autoPlay={true} controls={true}  loop={true}></video>
            </SwiperSlide>
          </div>

          <div className={styles.slideContainer}>
            <SwiperSlide>
              <video src="/videos/video2.mp4" autoPlay={true}  controls={true} loop={true}></video>
            </SwiperSlide>
          </div>

          
       
        </Swiper>
      </>
    </div>
  );
};

export default SuccessSlider;
