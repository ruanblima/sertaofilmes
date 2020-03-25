import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import request from '../../services/api';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator, Modal } from 'react-native';
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
  Loadding,
  ModalView,
} from './styles';
import { TouchableHighlight } from 'react-native-gesture-handler';

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
  const [isLoadding, setIsLoadding] = useState(false);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const searchRecentMovies = async () => {
    setIsLoadding(true);
    const response = await request(`discover/movie`, page);
    setMoviesRecent(response);
    setIsLoadding(false);
  };

  const modal = ({ item }) => {
    console.log(item);
    setModalOpen(true);
    return (
      <Modal
        visible={modalOpen}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalOpen(false)}
      >
        <ModalView>
          <MoviePoster
            source={{
              uri: 'https://image.tmdb.org/t/p/original' + item.poster_path,
            }}
          />

          <Icon
            name="close"
            size={90}
            color="#fff"
            onPress={() => setModalOpen(false)}
          />
        </ModalView>
      </Modal>
    );
  };

  const movieListRecent = ({ item }) => {
    return (
      <>
        <Movie>
          <TouchableHighlight onPress={() => {}}>
            <MoviePoster
              source={{
                uri: 'https://image.tmdb.org/t/p/original' + item.poster_path,
              }}
            />
          </TouchableHighlight>
        </Movie>
      </>
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
          <Icon name="search" size={20} color="#8b0000" />
        </SubmitButton>
      </Form>

      {isLoadding ? (
        <Loadding />
      ) : movieListRecent.length ? (
        <List
          numColumns={3}
          data={moviesRecent.results}
          keyExtractor={(item) => item.id}
          renderItem={movieListRecent}
        />
      ) : null}
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Sertão Filmes',
};
