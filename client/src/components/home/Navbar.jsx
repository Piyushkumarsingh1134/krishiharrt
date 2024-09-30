import { Box, Button, Typography, styled } from "@mui/material";
import { navData } from '../../constants/data';

const StyledButton = styled(Button)({
    display: 'flex',
    flexDirection: 'column', // Stack the image and text vertically
    alignItems: 'center',    // Center the content
    padding: '8px',
    textTransform: 'none',   // Disable uppercase transformation
    '& img': {
        width: '50px',        // Set the image width
        height: '50px',       // Set the image height
        marginBottom: '2px',  // Reduce the space between image and text
    },
    '& p': {
        margin: 0,            // Remove default margin
        fontSize: '14px',     // Set font size
        color: '#333',        // Set text color
    }
});

const Navbar = () => {
    return (
        <Box display="flex" justifyContent="space-around">
            {navData.map((item, index) => (
                <StyledButton key={index}>
                    <img src={item.url} alt={item.text} />
                    <p>{item.text}</p>
                </StyledButton>
            ))}
        </Box>
    );
}

export default Navbar;


