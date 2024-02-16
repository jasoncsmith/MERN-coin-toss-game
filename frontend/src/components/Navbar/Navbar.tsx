import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Typography, Toolbar, Button } from '@mui/material';

import Profile from '../Profile';
import GameHud from '../Game/components/HUD';

import { styles } from './styles';
import { UserState } from '../../reducers/user';
import { ReduxState } from '../../reducers';

const Navbar = () => {
    const { user }: UserState = useSelector((state: ReduxState) => state.user);

    return (
        <AppBar
            sx={styles.appBar}
            position="static"
            color="inherit"
        >
            <div style={styles.wrap}>
                <div style={styles.brandContainer}>
                    <Typography
                        component={Link}
                        to="/"
                        sx={styles.heading}
                        variant="h5"
                        align="center"
                    >
                        Coin Toss
                    </Typography>
                </div>

                <Toolbar sx={styles.toolbar}>
                    {user ? (
                        <Profile />
                    ) : (
                        <Button
                            component={Link}
                            to="/auth"
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                    )}
                </Toolbar>
            </div>

            <GameHud />
        </AppBar>
    );
};

export default Navbar;
