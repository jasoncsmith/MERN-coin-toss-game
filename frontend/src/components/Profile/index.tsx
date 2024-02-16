import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Avatar, Popover } from '@mui/material';

import { UserState } from '../../reducers/user';
import { ReduxState } from '../../reducers';

import Logout from './components/Logout';

import { styles } from './styles';

const Profile = () => {
    const { user }: UserState = useSelector((state: ReduxState) => state.user);
    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

    const open = anchorEl !== null;
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event: React.MouseEvent) =>
        setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    if (!user) {
        return <></>;
    }

    return (
        <div>
            <Avatar
                sx={styles.avatar}
                alt={user?.name}
                onClick={handleClick}
                aria-describedby={id}
            >
                {user?.name?.charAt(0)}
            </Avatar>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <div style={styles.popover}>
                    <Typography
                        sx={styles.userName}
                        variant="h6"
                    >
                        {user?.name}
                    </Typography>
                    <Logout onClick={handleClose} />
                </div>
            </Popover>
        </div>
    );
};

export default Profile;
