export const getFavorites = () => JSON.parse(localStorage.getItem('savedList')) || [];

export  const  setFavorites = (list) => localStorage.setItem('savedList', JSON.stringify(list));

export const addFavorite = (film) => setFavorites([...getFavorites() , film]);

export const getFilms = async (page) => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=ru-Ru&page=${page}`;
    let response = await fetch(url);
    return await response.json();
}

export const checkFavorite = (id) => {
    const arr = getFavorites();
    return arr?.some(item=> item?.id === +id);
}