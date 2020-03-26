import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import request from '../../services/api';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import { TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import {
  Container,
  SearchButton,
  List,
  MoviePoster,
  Movie,
  NameMovie,
  MenuButton,
  Loadding,
  ModalView,
  MoviePosterModal,
  NameApp,
  DetailsMovie,
  DateMovie,
  Header,
  BackButton,
  Menu,
} from './styles';
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

export default function Main({ navigation }) {
  const [moviesRecent, setMoviesRecent] = useState('');
  const [isLoadding, setIsLoadding] = useState(false);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState('');

  const searchRecentMovies = async () => {
    setIsLoadding(true);
    var date = new Date().getDate();
    var year = new Date().getFullYear();
    const response = await request(
      `discover/movie`,
      ``,
      `&primary_release_year=${year}&primary_release_date.gte=${date}&include_adult=false&include_video=false`,
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
      <Header>
        <MenuButton>
          <Icon name="menu" size={20} color="#8b0000" />
        </MenuButton>
        <NameApp>Sertão Filmes</NameApp>
        <SearchButton onPress={() => navigation.navigate('Search')}>
          <Icon name="search" size={20} color="#8b0000" />
        </SearchButton>
      </Header>

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
        <ScrollView>
          <ModalView>
            <Header>
              <BackButton>
                <Icon
                  name="keyboard-arrow-left"
                  size={40}
                  color="#8b0000"
                  onPress={() => setModalOpen(false)}
                />
              </BackButton>
              <NameApp>Sertão Filmes</NameApp>
            </Header>

            <MoviePosterModal
              source={{
                uri: 'https://image.tmdb.org/t/p/original' + item.poster_path,
              }}
            />

            <NameMovie>{item.original_title}</NameMovie>
            <DateMovie>({item.release_date})</DateMovie>
            <DetailsMovie>Popularidade</DetailsMovie>
            <DetailsMovie>{item.popularity}</DetailsMovie>
            <DetailsMovie>Média de votos</DetailsMovie>
            <DetailsMovie>{item.vote_average}</DetailsMovie>
            <DetailsMovie>Linguagem original</DetailsMovie>
            <DetailsMovie>{item.original_language}</DetailsMovie>
            <DetailsMovie>Visão geral</DetailsMovie>
            <DetailsMovie>{item.overview}</DetailsMovie>
          </ModalView>
        </ScrollView>
      </Modal>
    </Container>
  );
}
