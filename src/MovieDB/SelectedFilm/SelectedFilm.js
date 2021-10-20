import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {addFavorite, checkFavorite, getFilms} from '../../common/utils';
import style from './SelectedFilm.module.css';
import {useDispatch} from 'react-redux';

const SelectedFilm = () => {
    const history = useHistory();
    const {id, page} = useParams();
    const [info, setInfo] = useState(null);
    const [dataFilms, setDataFilms] = useState(null);
    const [isFavorite, setIsFavorite] = useState(checkFavorite(id));
    const dispatch = useDispatch();
    const backgroundImg = {
        backgroundImage: info && `url(https://image.tmdb.org/t/p/original/${info?.backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    }

    const fetchData = useCallback(async () => {
            const data = await getFilms(page);
            setDataFilms(data);
        }, [page]
    );

    useEffect(() => {
            fetchData();
        }, [fetchData]
    );

    const fetchFilm = useCallback(async () => {
            const url = `https://api.themoviedb.org/3/movie/${id}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=ru-Ru`;
            const response = await fetch(url);
            const data = await response.json();
            setInfo(data);
        }, [id]
    );

    useEffect(() => {
            fetchFilm();
        }, [fetchFilm, id]
    );

    const currentIndex = useMemo(() => {
            let films = dataFilms?.results;
            return films?.findIndex(item => item.id === +id);
        }, [dataFilms?.results, id]
    );


    const handleBack = useCallback(
        () => {
            history.push(`/${page}`);
        }, [page, history]
    );

    const handleNextFilm = useCallback(
        async () => {
            let data = await getFilms(page);
            let films = data.results;
            let index = films.findIndex(item => item.id === +id);
            let nextIndex = index + 1;
            let nextPage = +page;

            if (index === films.length - 1) {
                let data = await getFilms(+page + 1);
                films = data.results;
                nextIndex = 0;
                nextPage += 1;
            }

            setIsFavorite(checkFavorite(films[nextIndex].id));
            history.push(`/${nextPage}/${films[nextIndex].id}`);
        }, [history, id, page]
    );

    const handleFavorite = () => {
        addFavorite(info);
        dispatch({type: 'PUSH_FAVORITE', payload: info});
        setIsFavorite(true);
    }

    return (
        <div style={backgroundImg}>
            <div className={style.blur}>
                <div className={style.navigate}>
                    <div className={style.back}>
                        <div className={style.btn} onClick={handleBack}>&#5176;</div>
                        <div className={style.text}>Назад к списку</div>
                    </div>
                    {currentIndex !== dataFilms?.results.length - 1 && page !== dataFilms?.total_pages ? (
                        <div className={style.back}>
                            <div className={style.text}>Следующий фильм</div>
                            <div className={style.btn} onClick={handleNextFilm}>&#5171;</div>
                        </div>) : null}
                </div>
                <div className={style.total}>
                    <img
                        className={style.poster}
                        src={info && `http://image.tmdb.org/t/p/w342${info?.poster_path}`}
                        alt='Ошибка при загрузки изображения!'
                    />
                    <div className={style.details}>
                        <div className={style.header}>
                            <div className={style.title}>{info?.title}</div>
                            {!isFavorite && <div className={style.favourite} onClick={handleFavorite}>В избранное</div>}
                        </div>
                        <div className={style.score}>
                            <div className={style.head}> Оценка: {info?.vote_average}</div>
                            <div className={style.head}> Дата выхода: {info?.release_date}</div>
                            <div className={style.head}> Продолжительность: {info?.runtime} мин.</div>
                        </div>
                        <div className={style.overview}>{info?.overview}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectedFilm;