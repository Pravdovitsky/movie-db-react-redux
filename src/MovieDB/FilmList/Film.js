import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import style from './Film.module.css'

const Film = ({item, currentPage}) => {
    const history = useHistory();

    const activeFilm = useCallback(
        () => {
            history.push(`/${currentPage}/${item.id}`);
        }, [currentPage, history, item.id]
    );

    return (
        <div>
            <img
                onClick={activeFilm}
                className={style.item}
                src={`http://image.tmdb.org/t/p/w342${item.poster_path}`}
                alt='Ошибка при загрузки изображения!'
            />
        </div>
    )
}

export default Film;