import React from 'react';
import FavoriteItem from './FavoriteItem';
import styles from './Favorite.module.css';
import {useSelector} from 'react-redux';
import {favoriteSelector} from '../store/selectors';

const Favorite = () => {
    const favoriteList = useSelector(favoriteSelector);

    return (
        <>
            <div className={styles.text}>Мои избранные фильмы</div>
            <div className={styles.container}>
                {
                    favoriteList.map(item => (
                        <FavoriteItem
                            key={item.id}
                            item={item}
                        />
                    ))
                }
            </div>
        </>
    )
};

export default Favorite;