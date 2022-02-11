import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import styles from "../../styles/components/SuccessSlider.module.css";

// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

const SuccessSlider = ({ videos }) => {
  return (
    <div>
      <>
        <Swiper
          autoplay={{
            delay: 7500,
            disableOnInteraction: true,
          }}
          loop={true}
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
          {videos.map((video, index) => (
            <div className={styles.slideContainer} key={index}>
              <SwiperSlide>
                <div>
                  <iframe
                    controls={true}
                    autoPlay={true}
                    src={video}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default SuccessSlider;
