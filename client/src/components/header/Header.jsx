import { AppBar, Toolbar, styled, Typography, CssBaseline } from '@mui/material';
import { assets } from '../../assets/froented/assests';
import Search from './search';
import CustomButton from './Custombutton';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#006400',
  height: '55px',
  margin: 0,
  padding: 0,
  boxShadow: 'none',
});

const StyledToolbar = styled(Toolbar)({
  minHeight: '55px',
  padding: 0,
  alignItems: 'center',
  justifyContent: 'flex-start',
});

const Logo = styled('img')({
  height: '40px',
  marginLeft: '20px',
  padding: '5px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
});

const Title = styled(Typography)({
  color: '#ffffff',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  marginLeft: '10px',
});

const Header = () => {
  return (
    <>
      <CssBaseline />
      <StyledAppBar position="static">
        <StyledToolbar>
          <Link to="/">
            <Logo src={assets.logo} alt="Logo" />
          </Link>
          <Title variant="h6">KrishiHaat</Title>
          <Search />
          <CustomButton />
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
};

export default Header;



