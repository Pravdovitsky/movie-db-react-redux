import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import style from './Header.module.css'

const Header = () => {
    const history = useHistory();

    const handleStart = useCallback(
        () => {
            history.push(`/1`);
        }, [history]
    );

    const handleToFavorite = useCallback(
        (e) => {
            if (e.target.value === 'favorite') {
                history.push('/favorite');
                e.target.value = 'my-account';
            }
        }, [history]
    );

    return (
        <div className={style.header}>
            <div className={style.logo} onClick={handleStart}>Movie-DB</div>
            <div>
                <select className={style.minimal} onChange={handleToFavorite}>
                    <option value='my-account'>Мой аккаунт</option>
                    <option value='favorite'>Избранное</option>
                </select>
            </div>
        </div>
    )
}

export default Header;