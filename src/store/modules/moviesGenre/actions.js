export function addMoviesGenre(moviesGenre, movieResult) {
  let movies = [...moviesGenre, ...movieResult];

  return {
    type: 'ADD_MOVIES_LIST_MOVIES_GENRE',
    results: movies,
  };
}

export function incrementPage(page) {
  return {
    type: 'INCREMENT_PAGE',
    page: page,
  };
}
