import React from 'react';
import classNames from 'classnames';
import { Status } from '../../../../reducers/game';

import styles from './index.module.scss';

interface WinningStreakProps {
    items: Status[];
}

const WinningStreak = ({ items = [] }: WinningStreakProps) => {
    const winningStreak = [...Array(5)].fill('1', 0, items.length);

    return (
        <div className={styles.winningStreak}>
            <h6 className={styles.winningStreak__title}>Winning Streak</h6>
            <div className={styles.winningStreak__container}>
                {winningStreak.map((item, i) => (
                    <span
                        key={`${i}_${i}`}
                        className={classNames({
                            [styles.winningStreak__item]: true,
                            [styles.winningStreak__itemIsWin]: !!item,
                        })}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default WinningStreak;
