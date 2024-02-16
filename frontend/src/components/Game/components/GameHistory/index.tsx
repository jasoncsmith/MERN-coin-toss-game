import React from 'react';
import classNames from 'classnames';
import { Status } from '../../../../reducers/game';

import styles from './index.module.scss';

interface GameHistoryProps {
    items: Status[];
}

const GameHistory = ({ items }: GameHistoryProps) => {
    return (
        <div className={styles.gameHistory}>
            <h6 className={styles.gameHistory__title}>Last Ten Plays</h6>
            <div className={styles.gameHistory__items}>
                {items?.map((item, i) => (
                    <span
                        key={`${i}_${item.flipResult}`}
                        className={classNames({
                            [styles.gameHistory__item]: true,
                            [styles.gameHistory__itemIsLoss]: item.text === 'L',
                        })}
                    >
                        {item.text}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default GameHistory;
