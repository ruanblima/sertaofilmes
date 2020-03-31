export const INITIAL_STATE = {
  results: [],
  page: 0,
};
export default function moviesGenre(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_MOVIES_LIST_MOVIES_GENRE':
      return { ...state.results, results: action.results };
    case 'INCREMENT_PAGE':
      return {
        ...state.page,
        page: action.page,
      };
    default:
      return state;
  }
}
