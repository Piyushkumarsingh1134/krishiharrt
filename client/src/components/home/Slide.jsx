import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Slider = ({ products }) => {
    // State for the countdown timer
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    // Calculate the time left for the deal (e.g., 24-hour deal of the day)
    useEffect(() => {
        const countdown = () => {
            const now = new Date().getTime();
            const dealEndTime = new Date().setHours(24, 0, 0, 0); // End of the day
            const timeDifference = dealEndTime - now;

            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            setTimeLeft({ hours, minutes, seconds });
        };

        const timerId = setInterval(countdown, 1000);

        return () => clearInterval(timerId); // Cleanup the timer on component unmount
    }, []);

    return (
        <Box>
            {/* Deal of the Day Banner */}
            <Box textAlign="center" mb={2}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                    Deal of the Day
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Hurry! Offer ends in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </Typography>
            </Box>

            {/* Carousel Component */}
            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                centerMode={true}
                pauseOnHover={true}
            >
                {products.map(product => (
                   <Link to={`/product/${product._id}`}>
                    <Box key={product._id} textAlign="center" p={2}>
                        <img src={product.imageurl} alt={product.name} width="200" height="150" />
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography variant="body1" color="textSecondary">
                            ${product.price}
                        </Typography>
                    </Box>
                    </Link>
                ))}
            </Carousel>
        </Box>
    );
};

export default Slider;

