const key = '37092898327251c971dbebd9c63c45b0';

const api = 'https://api.themoviedb.org/3';

const language = 'pt-BR';

export default async function request(url) {
  const response = await fetch(
    `${api}/${url}?api_key=${key}&language=${language}&page=1`
  );
  return response.json();
}
