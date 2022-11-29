// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Chip from "@mui/material/Chip";

// Import Swiper styles
import "swiper/css";

const Swip = () => {
  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={5}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <Chip label="1" />
      </SwiperSlide>
      <SwiperSlide>
        <Chip label="2" />
      </SwiperSlide>
      <SwiperSlide>
        <Chip label="3" />
      </SwiperSlide>
      <SwiperSlide>
        <Chip label="4" />
      </SwiperSlide>
      <SwiperSlide>
        <Chip label="5" />
      </SwiperSlide>
      <SwiperSlide>
        <Chip label="6" />
      </SwiperSlide>
      <SwiperSlide>
        <Chip label="7" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Swip;
