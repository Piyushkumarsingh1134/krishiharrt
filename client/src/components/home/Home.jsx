import Navbar from "./Navbar";
import { Fragment, useEffect } from "react";
import Banner from "./Banner";
import { Box, Typography } from "@mui/material";
import { add } from '../../redux/Cartslice';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES, fetchproducts} from '../../redux/Productslice';
import Slider from "./slide"; // Ensure the file name matches with 'Slide.js'
import Footer from "../Footer/Footer";

const Home = () => {
    const dispatch = useDispatch();
    const { data: products = [], status } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchproducts());
    }, [dispatch]);

    const handleAddToCart = (product) => {
        dispatch(add(product));
    };

    if (status === STATUSES.LOADING) {
        return <Typography variant="h4" fontWeight="bold">Loading...</Typography>;
    }

    if (status === STATUSES.ERROR) {
        return <Typography variant="h4" fontWeight="bold" color="error">Error fetching products!</Typography>;
    }

    return (
        <Fragment>
            <Navbar />
            
            <Box>
                <Banner />
             
                <Slider products={products} title="Deal of the Day" showDealBanner={true} />
                
              
                <Slider products={products} title="For You" />
                
              
                <Slider products={products} title="Trending" />
            </Box>
            <Footer/>
        </Fragment>
    );
};

export default Home;


