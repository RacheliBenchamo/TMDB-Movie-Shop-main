/**
 * Constants for the application
 */
export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE'
};

export const CART_API_URL = '/api/cart';
export const CLEAR_CART_URL = `${CART_API_URL}/delete`;
export const PURCHASES_API_URL = '/api/purchases';
export const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=';
export const TMDB_TOP_RATED_URL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=';
export const TMDB_DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie?';
export const POPULAR_MOVIES_URL = "sort_by=popularity.desc";
export const ANIMATION_MOVIES_URL = "with_genres=16";
export const COMEDY_MOVIES_URL = "with_genres=35";
export const CRIME_MOVIES_URL = "with_genres=80";
export const UPCOMING_MOVIES_URL = "primary_release_date.gte=";
export const API_KEY = '207cb0eb0009f07d6f0611c4537bb079';
export const NO_IMAGE = 'https://joadre.com/wp-content/uploads/2019/02/no-image.jpg';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
export const PAGE = "&page=";
export const NO_ADULT = '&adult=false';
export const QUERY = '&query=';
export const KEY = '&api_key=';
export const GENRE = "genre";
export const NO_RESULTS = 'No results found';



