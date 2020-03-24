import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import request from '../../services/api';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  MoviePoster,
  Movie,
  NameMovie,
  WatchMovieButton,
  WatchMovieButtonText,
  Menu,
} from './styles';

//test('should verify if request movies list', async () => {
//const data = await request('discover/movie', { page: 1 }, true);

//expect(data).toBe(200);
//});

//test('should verify if request movie search', async () => {
//const data = await request(
//'search/movie',
// { page: 1, query: 'Tomb Raider' },
//true
//);

//expect(data).toBe(200);
//});

//test('should verify if request movies list with genre X', async () => {
//const data = await request(
//'discover/movie',
// { page: 1, with_genres: '12' },
// true
// );

// expect(data).toBe(200);
//});

export default function Main() {
  const [moviesRecent, setMoviesRecent] = useState('');

  const searchRecentMovies = async () => {
    const response = await request(`discover/movie`);
    setMoviesRecent(response);
  };

  const movieListRecent = ({ item }) => {
    return (
      <Movie>
        <MoviePoster
          source={{
            uri: 'https://image.tmdb.org/t/p/original' + item.poster_path,
          }}
        />
        <NameMovie>{item.title}</NameMovie>

        <WatchMovieButton>
          <WatchMovieButtonText>Ver filme</WatchMovieButtonText>
        </WatchMovieButton>
      </Movie>
    );
  };

  useEffect(() => {
    searchRecentMovies();
  }, []);

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Pesquisar Filmes"
          //value={newUser}
          //onChangeText={text => this.setState({ newUser: text })}
          returnKeyType="send"
          //onSubmitEditing={this.handlerAddUser}
        />

        <SubmitButton>
          <Icon name="search" size={20} color="#FFF" />
        </SubmitButton>
      </Form>

      <List
        data={moviesRecent.results}
        keyExtractor={(item) => item.id}
        renderItem={movieListRecent}
      />
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Sertão Filmes',
};
