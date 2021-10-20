import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MovieList from '../FilmList/MovieList';
import SelectedFilm from '../SelectedFilm/SelectedFilm';
import Favorite from '../Favorite/Favorite';

const Cabinet = () => {
    return (
        <div>
            <Switch>
                <Route path='/favorite'>
                    <Favorite/>
                </Route>
                <Route path='/:page/:id'>
                    <SelectedFilm/>
                </Route>
                <Route path='/:page?'>
                    <MovieList/>
                </Route>
            </Switch>
        </div>
    )
}

export default Cabinet;