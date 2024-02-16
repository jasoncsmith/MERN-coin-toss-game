import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Grow, Paper, Typography } from '@mui/material';

import { UserState } from '../../reducers/user';
import { ReduxState } from '../../reducers';
import Game from '../Game';

const Home = () => {
    const { user }: UserState = useSelector((state: ReduxState) => state.user);

    if (!user)
        return (
            <Container
                component="main"
                maxWidth="sm"
            >
                <Typography
                    variant="h4"
                    align="center"
                    color="primary"
                >
                    Login to Play
                </Typography>
            </Container>
        );

    return (
        <Grow in>
            <Container
                component="main"
                maxWidth="sm"
            >
                <Paper elevation={3}>
                    <Typography
                        variant="h4"
                        align="center"
                        color="primary"
                        sx={{ padding: '12px 0' }}
                    >
                        {`Welcome ${user.name}`}
                    </Typography>

                    <Game />
                </Paper>
            </Container>
        </Grow>
    );
};

export default Home;
