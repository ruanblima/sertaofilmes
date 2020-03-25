const key = '37092898327251c971dbebd9c63c45b0';

const api = 'https://api.themoviedb.org/3';

const language = 'pt-BR';

//https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-
//US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1

export default async function request(url, filter, page) {
  const response = await fetch(
    `${api}/${url}?api_key=${key}&language=${language}${filter}&page=${page}`
  );
  return response.json();
}
