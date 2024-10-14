import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import Banner1 from "../assets/images/banner1.jpg";
import Banner2 from "../assets/images/banner2.jpg";
import Banner3 from "../assets/images/banner3.jpg";
import { Autoplay, Navigation } from "swiper/modules";
import { useLocation } from "react-router-dom";

export default function Banner() {
  const location = useLocation();
  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay
        className="xl:h-[100svh]"
      >
        <SwiperSlide>
          <img src={Banner1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner3} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
