import { Link } from 'react-router-dom';
import { navData } from '../../constants/data';

const Navbar = () => {
    return (
        <div className="flex justify-around">
            <Link to='/Seed'>
                <div className="flex flex-col items-center p-2">
                    <img src={navData[0].url} alt={navData[0].text} className="w-12 h-12 mb-1" />
                    <p className="text-sm text-gray-800">{navData[0].text}</p>
                </div>
            </Link>
            <Link to='/Fertilizers'>
                <div className="flex flex-col items-center p-2">
                    <img src={navData[1].url} alt={navData[1].text} className="w-12 h-12 mb-1" />
                    <p className="text-sm text-gray-800">{navData[1].text}</p>
                </div>
            </Link>
            
            <Link to={navData[2].link}>
                <div className="flex flex-col items-center p-2">
                    <img src={navData[2].url} alt={navData[2].text} className="w-12 h-12 mb-1" />
                    <p className="text-sm text-gray-800">{navData[2].text}</p>
                </div>
            </Link>

            <Link to={navData[3].link}>
                <div className="flex flex-col items-center p-2">
                    <img src={navData[3].url} alt={navData[3].text} className="w-12 h-12 mb-1" />
                    <p className="text-sm text-gray-800">{navData[3].text}</p>
                </div>
            </Link>
    </div>
    );
};

export default Navbar;




