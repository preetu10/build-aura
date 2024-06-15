/* eslint-disable react/no-unescaped-entities */

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
const Banner = () => {
  return (
    <div className="px-2">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 3500 }}
        modules={[EffectFade, Pagination, Autoplay]}
        className="mySwiper rounded-xl mt-3 mb-10"
      >
        <SwiperSlide>
          <div
            className="hero min-h-screen shadow-[#1967D2] shadow-2xl"
            style={{
              backgroundImage: "url(banner1.jpg)",
            }}
          >
            <div className="hero-overlay "></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-3xl">
                <h1 className="mb-5 text-5xl font-extrabold">
                  {" "}
                  Discover Life at BuildAura
                </h1>
                <p className="mb-5 font-semibold text-xl">
                  Embrace modern living with premium amenities, crafted for your
                  ultimate comfort and satisfaction.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero min-h-screen shadow-[#1967D2] shadow-2xl"
            style={{
              backgroundImage: "url(banner2.jpg)",
            }}
          >
            <div className="hero-overlay "></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-3xl">
                <h1 className="mb-5 text-5xl font-extrabold">
                  {" "}
                  Exceptional Apartments Await
                </h1>
                <p className="mb-5 font-semibold text-xl">
                  Experience unmatched comfort and convenience, in every
                  thoughtfully designed corner of our homes.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero min-h-screen shadow-[#1967D2] shadow-2xl"
            style={{
              backgroundImage: "url(banner3.jpg)",
            }}
          >
            <div className="hero-overlay "></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-3xl">
                <h1 className="mb-5 text-5xl font-extrabold">
                  Find Your Perfect Space
                </h1>
                <p className="mb-5 font-semibold text-xl">
                  Explore our diverse range of apartments tailored to your
                  needs. A home for every lifestyle and family size.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero min-h-screen shadow-[#1967D2] shadow-2xl"
            style={{
              backgroundImage: "url(banner4.jpg)",
            }}
          >
            <div className="hero-overlay "></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-3xl">
                <h1 className="mb-5 text-5xl font-extrabold">
                  Secure and Serene Environment
                </h1>
                <p className="mb-5 font-semibold text-xl">
                  Enjoy a safe and peaceful living experience, providing
                  tranquility for you and your family.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
