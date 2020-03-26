import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import request from '../../services/api';
import { TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import { Keyboard, ActivityIndicator, Modal } from 'react-native';
import { Background } from '../../components/Background/index';
import {
  Form,
  Input,
  SubmitButton,
  Header,
  BackButton,
  NameApp,
  DetailsMovie,
  DateMovie,
  Loadding,
  ModalView,
  MoviePosterModal,
  List,
  MoviePoster,
  Movie,
  NameMovie,
} from './styles';

export default function Search({ navigation }) {
  const [movies, setMovies] = useState('');
  const [isLoadding, setIsLoadding] = useState(false);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState('');
  const [query, setQuery] = useState('');
  const [loadindSearch, setLoadinSerach] = useState(false);

  //Buscar filmes na api pela a query
  const searchMovies = async () => {
    setIsLoadding(true);
    setLoadinSerach(true);
    const response = await request(`search/movie`, `query=` + query, ``, page);
    setMovies(response);
    setIsLoadding(false);
    setLoadinSerach(false);
    Keyboard.dismiss();
  };

  //Lista de filmes buscados
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

  return (
    <Background>
      <Header>
        <BackButton onPress={() => navigation.pop()}>
          <Icon name="keyboard-arrow-left" size={40} color="#FFF" />
        </BackButton>
        <NameApp>Sertão Filmes</NameApp>
      </Header>

      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Pesquisar Filmes"
          returnKeyType="send"
          onSubmitEditing={searchMovies}
          value={query}
          onChangeText={setQuery}
        />

        <SubmitButton loading={loadindSearch} onPress={searchMovies}>
          {loadindSearch ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Icon name="search" size={20} color="#8b0000" />
          )}
        </SubmitButton>
      </Form>

      {isLoadding ? (
        <Loadding />
      ) : movieList.length ? (
        <List
          numColumns={3}
          data={movies.results}
          keyExtractor={(item) => item.id}
          renderItem={movieList}
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
