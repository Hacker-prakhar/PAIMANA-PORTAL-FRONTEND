import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  Pagination,
  EffectFade,
  Navigation,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { bannerLists } from "../../utils";

const HeroBanner = () => {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        className="hero-swiper"
      >
        {bannerLists.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-[590px] w-full overflow-hidden">

              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Dark overlay over entire image */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Center Content */}
              <div className="absolute inset-0 flex items-center justify-center px-4">

                <div className="
                  w-full
                  max-w-6xl
                  rounded-xl
                  bg-black/60
                  px-6
                  py-10
                  text-center
                  backdrop-blur-[2px]
                  sm:px-10
                  md:px-16
                  md:py-12
                ">

                  <h1 className="
                    text-4xl
                    font-bold
                    tracking-[0.15em]
                        text-secondary
                    sm:text-5xl
                    md:text-6xl
                  ">
                    {item.title}
                  </h1>

                  <p className="
                    mt-5
                    text-lg
                    font-medium
                    text-white
                    sm:text-xl
                    md:text-2xl
                  ">
                    {item.description}
                  </p>

                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroBanner;