import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Button,
    Container,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import LockIcon from '@mui/icons-material/LockOutlined';
import Input from '../Input/Input';

import { signup, login, SignUpFormData } from '../../actions/auth';

import { styles } from './styles';
import { AppDispatch, ReduxState } from '../../reducers';
import { UserState } from '../../reducers/user';

const formDataInitVal: SignUpFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const Login = () => {
    const { user }: UserState = useSelector((state: ReduxState) => state.user);
    const [formData, setFormData] = useState<SignUpFormData>(formDataInitVal);
    const [showPassword, setShowPassword] = useState(false);
    const [hasAccount, setHasAccount] = useState(true);

    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (hasAccount) {
            dispatch(login(formData));
        } else {
            dispatch(signup(formData));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleShowPassword = () => {
        setShowPassword((prevPassword) => !prevPassword);
    };

    const switchLogin = () => {
        setHasAccount((prevState) => !prevState);
    };

    if (user)
        return (
            <Typography
                variant="h4"
                align="center"
                color="primary"
            >
                Go Toss some Coins <b>{user?.name}</b>!{' '}
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="primary"
                >
                    Play
                </Button>
            </Typography>
        );

    return (
        <div>
            <Container
                component="main"
                maxWidth="xs"
            >
                <Paper
                    sx={styles.paper}
                    elevation={3}
                >
                    <Avatar sx={styles.avatar}>
                        {' '}
                        <LockIcon />
                    </Avatar>
                    <Typography
                        variant="h5"
                        color="primary"
                    >
                        {hasAccount ? 'Login' : 'Create Account'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid
                            container
                            spacing={2}
                        >
                            {!hasAccount && (
                                <>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        label="First Name"
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                    />
                                    <Input
                                        type="text"
                                        name="lastName"
                                        label="Last Name"
                                        handleChange={handleChange}
                                        half
                                    />
                                </>
                            )}

                            <Input
                                name="email"
                                type="email"
                                label="Email Address"
                                handleChange={handleChange}
                            />
                            <Input
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                handleChange={handleChange}
                                handleShowPassword={handleShowPassword}
                                half={hasAccount ? false : true}
                            />
                            {!hasAccount && (
                                <Input
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    handleChange={handleChange}
                                    half
                                />
                            )}
                        </Grid>
                        <Button
                            type="submit"
                            sx={styles.submit}
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            {hasAccount ? 'Login' : 'Sign Up'}
                        </Button>
                        <Grid
                            container
                            justifyContent="flex-end"
                        >
                            <Grid item>
                                <Button onClick={switchLogin}>
                                    {hasAccount
                                        ? "Don't Have An Account? Sign Up."
                                        : 'Already Have An Account? Login.'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default Login;
