import seeds from './seeds.jpeg'; 
import fertilizers from './fertilizers.jpeg';
import topdeals from './topdeals.png';
import nearbystore from './nearbystore.jpg';
import Farmer from './Farmer.jpg';
import farmerstory from './farmerstory.jpg';
import { Link } from 'react-router-dom';

export const navData = [
    { url: seeds, text: 'Seeds', link: '/Seeds' },  
    { url: fertilizers, text: 'Fertilizers', link: '/ Fertilizers' },
    { url: topdeals, text: 'Top Deals', link: '/top-deals' },
    { url: nearbystore, text: 'Nearby Store', link: '/nearby-store' }
];

export const BannerData = [
    { id: 1, url: Farmer },
    { id: 2, url: farmerstory }
];


