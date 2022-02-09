import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../../styles/components/SuccessSlider.module.css";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination,Autoplay } from "swiper";

const TestimonialSlider = () => {
  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={
           { duration:3500}
        }
        modules={[Pagination,Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className={styles.testimonial}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              iste ratione harum adipisci earum, voluptates beatae nisi deleniti
              enim cumque.
            </p>

            <div className={styles.user}>
              <img src="/images/user2.png" alt="" />
              <span>Md Morsalin alif</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className={styles.testimonial}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                iste ratione harum adipisci earum, voluptates beatae nisi
                deleniti enim cumque.
              </p>

              <div className={styles.user}>
                <img src="/images/user1.png" alt="" />
                <span>Md Morsalin alif</span>
              </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className={styles.testimonial}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                iste ratione harum adipisci earum, voluptates beatae nisi
                deleniti enim cumque.
              </p>

              <div className={styles.user}>
                <img src="/images/user1.png" alt="" />
                <span>Md Morsalin alif</span>
              </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className={styles.testimonial}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                iste ratione harum adipisci earum, voluptates beatae nisi
                deleniti enim cumque.
              </p>

              <div className={styles.user}>
                <img src="/images/user1.png" alt="" />
                <span>Md Morsalin alif</span>
              </div>
            </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
