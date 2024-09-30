import { Box, Button, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/system';
import { useState } from "react";
import LoginDialog from '../login/logindialog';

const Wrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    margin: '10px'
});

const CustomButton = () => {
    const [open, setOpen] = useState(false);
    const [account, setAccount] = useState(''); 

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        setAccount(''); // Clear account on logout
    };

    return (
        <Wrapper>
            {!account ? (
                <Button 
                    variant="contained" 
                    sx={{ 
                        backgroundColor: '#006400',
                        '&:hover': {
                            backgroundColor: '#66CDAA', // Custom hover color
                        }
                    }}
                    onClick={openDialog} 
                >
                    Login
                </Button>
            ) : (
                <Box display="flex" alignItems="center" gap="10px">
                    <Typography> {account}</Typography>
                    <Button 
                        variant="contained" 
                        sx={{ 
                            backgroundColor: '#B2EBC2', // Initial background color (light green)
                            '&:hover': {
                                backgroundColor: '#99DFA3', // Custom hover color
                                boxShadow: 'none', // Remove default shadow on hover
                            },
                            '&:focus': {
                                outline: 'none', // Remove default focus outline
                            }
                        }} 
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            )}
            
            <Typography>Become a farmer Dealer</Typography>
            <Typography>More</Typography>
            <Box display="flex" alignItems="center" gap="4px">
                <ShoppingCartIcon />
                <Typography>CART</Typography>
            </Box>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
        </Wrapper>
    );
};

export default CustomButton;




