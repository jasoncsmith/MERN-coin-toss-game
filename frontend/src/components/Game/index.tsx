import Input from '../Input/Input';
import { useEffect, useState } from 'react';
import {
    FormControl,
    FormLabel,
    RadioGroup,
    Button,
    FormControlLabel,
    Paper,
    Typography,
    Radio,
    Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, ReduxState } from '../../reducers';
import { getGame, wager as wagerAction } from '../../actions/game';

import gameStyles from './index.module.scss';
import { styles } from './styles';

export interface WagerFormData {
    wager: string;
    coinSide: 'Heads' | 'Tails';
}

interface Errors {
    wager?: string;
}
const initialData: WagerFormData = { wager: '', coinSide: 'Heads' };

const transformToInteger = (val: string) => {
    const transformed = parseInt(val);
    return isNaN(transformed) ? '' : transformed;
};

const Game = () => {
    const dispatch: AppDispatch = useDispatch();
    const [store, setState] = useState<WagerFormData>(initialData);
    const [touched, setTouched] = useState({ wager: false, coinSide: false });
    const { tokens = 0 } = useSelector((state: ReduxState) => state.game);

    useEffect(() => {
        dispatch(getGame());
    }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const { wager, coinSide } = store;

        if (!!errors.wager) {
            return;
        }

        dispatch(
            wagerAction({
                wager,
                coinSide,
            })
        );
    }

    function handleBlur(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name } = e.target;

        setTouched({
            ...touched,
            [name]: true,
        });
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;

        setState({
            ...store,
            [name]: name === 'wager' ? transformToInteger(value) : value,
        });
    }

    function getErrors(): Errors {
        const errors: Errors = {};
        const { wager } = store;

        if (isNaN(+wager)) {
            errors.wager = 'Please enter a valid wager';
        } else if (+wager <= 0) {
            errors.wager = `Wager must be at least 1 token`;
        } else if (+wager > tokens) {
            errors.wager =
                tokens === 0
                    ? 'You are out of tokens'
                    : `Not enough tokens, max bet is ${tokens} tokens`;
        }

        return errors;
    }

    const errors = getErrors();

    return (
        <Paper
            className={gameStyles.game}
            sx={styles.paper}
            elevation={3}
        >
            <Typography
                variant="h5"
                color="primary"
                sx={styles.title}
            >
                Place Your Bet
            </Typography>
            <form>
                <Input
                    type={'text'}
                    name="wager"
                    label="Wager"
                    error={touched.wager && !!errors.wager}
                    value={store.wager}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                {touched.wager && errors.wager && (
                    <Alert severity="error">{errors.wager}</Alert>
                )}
                <FormControl sx={styles.radios}>
                    <FormLabel id="radio-picked-coin-side">
                        Pick Heads or Tails
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="radio-picked-coin-side"
                        defaultValue="Heads"
                        name="coinSide"
                        value={store.coinSide}
                        onChange={handleChange}
                    >
                        <FormControlLabel
                            value="Heads"
                            label="Heads"
                            control={<Radio />}
                        />
                        <FormControlLabel
                            value="Tails"
                            label="Tails"
                            control={<Radio />}
                        />
                    </RadioGroup>
                </FormControl>
                <Button
                    type="submit"
                    sx={styles.submit}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!!errors.wager}
                >
                    GO!
                </Button>
            </form>
        </Paper>
    );
};

export default Game;
