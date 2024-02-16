import React from 'react';

import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import { AppDispatch } from '../../../../reducers';
import { logout } from '../../../../actions/auth';

export default function Logout({ onClick }: { onClick: () => void }) {
    const dispatch: AppDispatch = useDispatch();

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={() => {
                onClick();
                dispatch(logout());
            }}
            fullWidth
        >
            Logout
        </Button>
    );
}
