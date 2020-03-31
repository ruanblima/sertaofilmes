export function addSearchMovies(searchMovies, movieResult) {
  let movies = [...searchMovies, ...movieResult];

  return {
    type: 'ADD_MOVIES_LIST_SEARCH_MOVIES',
    results: movies,
  };
}

export function incrementPage(page) {
  return {
    type: 'INCREMENT_PAGE',
    page: page,
  };
}
