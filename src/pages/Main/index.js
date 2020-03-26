import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import request from '../../services/api';
import PropTypes from 'prop-types';
import { Modal, View } from 'react-native';
import { TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import { Background } from '../../components/Background/index';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import {
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
  ButtonGenre,
  NameGenre,
  HeaderMenu,
  NameSearch,
  ButtonGenreIcon,
} from './styles';

export default function Main({ navigation }) {
  const [moviesRecent, setMoviesRecent] = useState('');
  const [isLoadding, setIsLoadding] = useState(false);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState('');
  const [genres, setGenres] = useState('');

  const searchGenres = async () => {
    const response = await request(`genre/movie/list`, ``, ``, page);
    setGenres(response);
  };

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

  const listGenre = ({ item }) => {
    return (
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('MovieGenre', {
            itemId: item.id,
          });
        }}
      >
        <ButtonGenre>
          <ButtonGenreIcon>
            <Icon name="local-movies" size={20} color="#FFF" />
          </ButtonGenreIcon>
          <NameGenre>{item.name}</NameGenre>
        </ButtonGenre>
      </TouchableHighlight>
    );
  };

  const renderDrawer = () => {
    return (
      <>
        <HeaderMenu>
          <NameSearch>Buscar filmes por gênero</NameSearch>
        </HeaderMenu>
        <List
          numColumns={1}
          data={genres.genres}
          keyExtractor={(item) => item.id}
          renderItem={listGenre}
        />
      </>
    );
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
    searchGenres();
  }, []);

  return (
    <DrawerLayout
      drawerWidth={250}
      drawerPosition={DrawerLayout.positions.Left}
      drawerType="front"
      drawerBackgroundColor="#8b0000"
      renderNavigationView={renderDrawer}
    >
      <Background>
        <Header>
          <MenuButton>
            <Icon name="menu" size={30} color="#FFF" />
          </MenuButton>
          <NameApp>Sertão Filmes</NameApp>
          <SearchButton onPress={() => navigation.push('Search')}>
            <Icon name="search" size={30} color="#FFF" />
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
                    color="#FFF"
                    onPress={() => setModalOpen(false)}
                  />
                </BackButton>
                <NameApp>Sertão Filmes</NameApp>
              </Header>

              <MoviePosterModal
                source={{
                  uri:
                    'https://image.tmdb.org/t/p/original' + item.backdrop_path,
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
      </Background>
    </DrawerLayout>
  );
}
