import React from 'react';
import { Button, Chip } from '@mui/material';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../../reducers';
import { refillTokens } from '../../../../actions/game';
import { formatNumber } from '../../../../helpers';

import styles from './index.module.scss';

interface TokensProps {
    tokens: number;
}

const Tokens = ({ tokens = 0 }: TokensProps) => {
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className={styles.tokens}>
            <h6 className={styles.tokens__title}>Tokens</h6>
            <Chip
                className={styles.tokens__chip}
                label={formatNumber(tokens)}
                variant="outlined"
            />
            {tokens <= 0 && (
                <Button
                    className={styles.tokens__button}
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(refillTokens())}
                >
                    GET MORE TOKENS!
                </Button>
            )}
        </div>
    );
};

export default Tokens;
