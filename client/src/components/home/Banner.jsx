import { Fragment } from "react";
import Carousel from 'react-multi-carousel';
import { BannerData } from '../../constants/data';
import { styled } from "@mui/material";
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const IMAGE = styled('img')({
    width: '100%',
    height: '280px' // Adjusted height to make the image smaller
});

const Banner = ({ deviceType }) => {
    return (
        <Carousel 
          responsive={responsive}
          swipeable={true}  // Enable swipeable for better UX on touch devices
          draggable={true}  // Enable draggable for better UX on touch devices
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          containerClass="carousel-container"
          infinite={true}
          autoPlay={true}  // Ensure autoPlay is true for all devices
          autoPlaySpeed={4000}
          slidesToSlide={1}
        >
            {BannerData.map((data, index) => (
                <IMAGE key={index} src={data.url} alt="banner" />
            ))}
        </Carousel>
    );
}







export default Banner;
