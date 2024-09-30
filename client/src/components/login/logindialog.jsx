import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, TextField, Box, Button, Typography, styled } from '@mui/material';
import { authenticateLogin, authenticateSignup } from '../../services/api.js';

const Component = styled(DialogContent)`
    height: 70vh;
    width: 90vh;
    padding: 0;
    padding-top: 0;
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #4CAF50; /* Green color for KrishiHaat */
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const RequestOTP = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #4CAF50; /* Green color for KrishiHaat */
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #606060; /* Darker gray for better readability */
    font-size: 14px;
`;

const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #4CAF50; /* Green color for KrishiHaat */
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
`;

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const Error = styled(Typography)`
    font-size: 12px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const Image = styled(Box)`
    background: #4CAF50 url('https://example.com/your-background-image.png') center 85% no-repeat;
    width: 40%;
    height: 100%;
    padding: 45px 35px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600;
    }
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
};

const accountInitialValues = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    }
};

const LoginDialog = ({ open, setOpen, setAccount }) => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState(false);
    const [account, toggleAccount] = useState(accountInitialValues.login);

    useEffect(() => {
        showError(false);
    }, [login]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        if (account.view === 'login') {
            setLogin({ ...login, [name]: value });
        } else {
            setSignup({ ...signup, [name]: value });
        }
    };

    const loginUser = async () => {
        let response = await authenticateLogin(login);
        if (!response) {
            showError(true);
        } else {
            showError(false);
            handleClose();
            setAccount(login.username);
            navigate('/');
        }
    };

    const signupUser = async () => {
        let response = await authenticateSignup(signup);
        if (!response) return;
        handleClose();
        setAccount(signup.username);
        navigate('/');
    };

    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    };

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
    };

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Component>
                <Box style={{ display: 'flex', height: '100%' }}>
                    <Image>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
                    </Image>
                    {account.view === 'login' ? (
                        <Wrapper>
                            <TextField
                                variant="standard"
                                onChange={onInputChange}
                                name="username"
                                label="Enter Email/Mobile number"
                                required
                            />
                            {error && <Error>Please enter valid Email ID/Mobile number</Error>}
                            <TextField
                                variant="standard"
                                onChange={onInputChange}
                                name="password"
                                label="Enter Password"
                                type="password"
                                required
                            />
                            <Text>
                                By continuing, you agree to Krishihaat Terms of Use and Privacy Policy.
                            </Text>
                            <LoginButton onClick={loginUser}>Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <RequestOTP>Request OTP</RequestOTP>
                            <CreateAccount onClick={toggleSignup}>
                                New to Krishihaat? Create an account
                            </CreateAccount>
                        </Wrapper>
                    ) : (
                        <Wrapper>
                            <TextField
                                variant="standard"
                                onChange={onInputChange}
                                name="firstname"
                                label="Enter Firstname"
                                required
                            />
                            <TextField
                                variant="standard"
                                onChange={onInputChange}
                                name="lastname"
                                label="Enter Lastname"
                                required
                            />
                            <TextField
                                variant="standard"
                                onChange={onInputChange}
                                name="username"
                                label="Enter Username"
                                required
                            />
                            <TextField
                                variant="standard"
                                onChange={onInputChange}
                                name="email"
                                label="Enter Email"
                                required
                            />
                            <TextField
                                variant="standard"
                                onChange={onInputChange}
                                name="password"
                                label="Enter Password"
                                type="password"
                                required
                            />
                            <TextField
                                variant="standard"
                                onChange={onInputChange}
                                name="phone"
                                label="Enter Phone"
                                required
                            />
                            <LoginButton onClick={signupUser}>Continue</LoginButton>
                        </Wrapper>
                    )}
                </Box>
            </Component>
        </Dialog>
    );
};

export default LoginDialog;

