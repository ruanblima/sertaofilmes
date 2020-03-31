export const INITIAL_STATE = {
  results: [],
  page: 0,
};
export default function moviesRecent(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_MOVIES_LIST_MOVIES_RECENT':
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
