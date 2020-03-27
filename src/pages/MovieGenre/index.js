import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import request from '../../services/api';
import { Modal } from 'react-native';
import { Background } from '../../components/Background/index';
import { TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import {
  Header,
  NameApp,
  NameMovie,
  BackButton,
  Movie,
  MoviePoster,
  MoviePosterModal,
  List,
  ModalView,
  DateMovie,
  Loadding,
  DetailsMovie,
} from './styles';

export default function MovieGenre({ route, navigation }) {
  const { itemId } = route.params;
  const [movies, setMovies] = useState([]);
  const [isLoadding, setIsLoadding] = useState(false);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState('');
  const [total, setTotal] = useState(0);

  const searchMoviesGenre = async () => {
    if (isLoadding) {
      return;
    }
    if (total > 0 && movies.length === total) {
      return;
    }
    setIsLoadding(true);
    const response = await request(
      `discover/movie`,
      ``,
      `&with_genres=${itemId}&include_adult=false&include_video=false`,
      page
    );
    setMovies([...movies, ...response.results]);
    setPage(page + 1);
    setTotal(response.total_results);
    setIsLoadding(false);
  };
  const movieList = ({ item }) => {
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
    searchMoviesGenre();
  }, []);

  return (
    <Background>
      <Header>
        <BackButton>
          <Icon
            name="keyboard-arrow-left"
            size={40}
            color="#FFF"
            onPress={() => navigation.pop()}
          />
        </BackButton>
        <NameApp>Sertão Filmes</NameApp>
      </Header>

      {isLoadding ? (
        <Loadding />
      ) : movieList.length ? (
        <List
          numColumns={3}
          data={movies}
          keyExtractor={(item) => item.id}
          onEndReached={searchMoviesGenre}
          onEndReachedThreshold={0.2}
          renderItem={movieList}
          onRefresh={() => searchMoviesGenre()}
          refreshing={isLoadding}
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
                uri: 'https://image.tmdb.org/t/p/original' + item.backdrop_path,
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
  );
}
