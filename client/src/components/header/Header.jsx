import { AppBar, Toolbar, styled, Typography, CssBaseline } from '@mui/material';
import { assets } from '../../assets/froented/assests';
import Search from './search';  // Adjust the import path as necessary
import CustomButton from './Custombutton';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)({
    backgroundColor: '#006400',  // Dark green color
    height: '55px',  // Fixed height
    margin: 0,  // No margin
    padding: 0,  // No padding
    boxShadow: 'none',  // Optional: Removes box shadow
});

const StyledToolbar = styled(Toolbar)({
    minHeight: '55px',  // Ensuring the Toolbar height matches the AppBar height
    padding: 0,  // Remove padding
    alignItems: 'center',  // Align items in the center vertically
    justifyContent: 'flex-start',  // Align items to the start of the toolbar
});

const Logo = styled('img')({
    height: '40px',
    marginLeft: '20px',  
    padding: '5px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
});

const Title = styled(Typography)({
    color: '#ffffff',  // White color for the text
    fontWeight: 'bold',  // Make the text bold
    fontSize: '1.5rem',  // Increase the font size
    marginLeft: '10px',  // Add some space between the logo and the text
});

const Header = () => {
    return (
        <>
            <CssBaseline /> {/* This resets margin/padding and sets base styles */}
            <StyledAppBar position="static">
                <StyledToolbar>
                    <Link to="/">  {/* Wrap the logo with Link */}
                        <Logo src={assets.logo} alt="Logo" />
                    </Link>
                    <Title variant="h6">KrishiHaat</Title>
                    <Search />  {/* Add your search component here */}
                    <CustomButton/>
                </StyledToolbar>
            </StyledAppBar>
        </>
    );
}

export default Header;



