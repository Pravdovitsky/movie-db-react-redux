import React, {useCallback, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Paginator from '../Pagination/Paginator';
import Film from './Film';
import style from './MovieList.module.css'
import paginate from './Pagination.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {filmsSelector, totalPageSelector} from '../store/selectors';

const MovieList = () => {
    const history = useHistory();
    const {page} = useParams();
    const currentPage = page || 1;
    const dispatch = useDispatch();
    const filmList = useSelector(filmsSelector);
    const totalPage = useSelector(totalPageSelector);

    const fetchFilms = useCallback(
        async () => {
            const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=ru-Ru&page=${currentPage}`;
            const response = await fetch(url);
            const data = await response.json();
            dispatch({type: 'SET_FILMS', payload: data});
        }, [currentPage, dispatch]
    );

    useEffect(() => {
            fetchFilms();
        }, [fetchFilms]
    );

    const changePage = useCallback(
        ({selected}) => {
            history.push(`/${selected + 1}`);
        }, [history]
    );

    return (
        <>
            <div className={style.list}>
                {
                    filmList.map(item => (
                        <Film
                            currentPage={currentPage}
                            key={item.id}
                            item={item}/>
                    ))
                }
            </div>
            <Paginator
                pageCount={totalPage}
                pageRangeDisplayed={3}
                marginPagesDisplayed={5}
                previousLabel={'<'}
                nextLabel={'>'}
                onPageChange={changePage}
                containerClassName={paginate.pagination}
                activeClassName={paginate.active}
            />
        </>
    )
}

export default MovieList;