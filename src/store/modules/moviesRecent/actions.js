export function addMoviesRecent(moviesRecent, movieResult) {
  let movies = [...moviesRecent, ...movieResult];

  return {
    type: 'ADD_MOVIES_LIST_MOVIES_RECENT',
    results: movies,
  };
}

export function incrementPage(page) {
  return {
    type: 'INCREMENT_PAGE',
    page: page,
  };
}
