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
  Menu,
  Loadding,
  ModalView,
  MoviePosterModal,
  NameApp,
  HeaderModal,
  Overview,
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
  const [item, setItem] = useState('');

  const searchRecentMovies = async () => {
    setIsLoadding(true);
    const response = await request(
      `discover/movie`,
      `&primary_release_year=2020&primary_release_date.gte=2020&include_adult=false&include_video=false`,
      page
    );
    setMoviesRecent(response);
    setIsLoadding(false);
  };

  const movieListRecent = ({ item }) => {
    return (
      <Movie>
        <TouchableHighlight
          onPress={() => {
            setItem(item);
            setModalOpen(true);
          }}
        >
          <MoviePoster
            source={{
              uri: 'https://image.tmdb.org/t/p/original' + item.poster_path,
            }}
          />
        </TouchableHighlight>
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

      <Modal
        visible={modalOpen}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalOpen(false)}
      >
        <ModalView>
          <HeaderModal>
            <Icon
              name="keyboard-arrow-left"
              size={40}
              color="#fff"
              onPress={() => setModalOpen(false)}
            />
            <NameApp>Sertão Filmes</NameApp>
          </HeaderModal>

          <MoviePosterModal
            source={{
              uri: 'https://image.tmdb.org/t/p/original' + item.poster_path,
            }}
          />

          <NameMovie>{item.original_title}</NameMovie>
          <Overview>Visão geral</Overview>
          <Overview>{item.overview}</Overview>
        </ModalView>
      </Modal>
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Sertão Filmes',
};
