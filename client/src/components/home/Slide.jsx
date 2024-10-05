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

const Slider = ({ products, title, showDealBanner }) => { 
    
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

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

        return () => clearInterval(timerId); 
    }, []);

    return (
        <Box>
            {/* Conditionally render the title */}
            <Box textAlign="left" mb={2} style={{ marginBottom: "15px", marginTop: "10px" }}> {/* Adjusted margin to move text slightly down */}
                <Typography 
                    variant="h4" 
                    fontWeight="bold" 
                    color="primary"
                    style={{ color: 'green', marginTop: '5px' }} // Moved text slightly lower
                >
                    {title}
                </Typography>

                {showDealBanner && (
                    <Typography 
                        variant="h6" 
                        color="textSecondary"
                        style={{ color: 'green', marginTop: '5px' }} // Moved countdown text slightly lower
                    >
                        Hurry! Offer ends in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                    </Typography>
                )}
            </Box>

            {/* Wrap the carousel inside a div */}
            <div style={{ padding: "10px", backgroundColor: "#f9f9f9" }}> {/* Example of padding and background */}
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
                    <Link to={`/product/${product._id}`} key={product._id}>
                        <Box textAlign="center" p={2}>
                            <img src={product.imageurl} alt={product.name} width="200" height="150" />
                            <Typography variant="h6" style={{ color: 'green' }}>{product.name}</Typography> {/* Text is green */}
                            <Typography variant="body1" color="textSecondary" style={{ color: 'green' }}> {/* Text is green */}
                                ${product.price}
                            </Typography>
                        </Box>
                    </Link>
                    ))}
                </Carousel>
            </div>
        </Box>
    );
};

export default Slider;





