import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import request from '../../services/api';
import { TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import {
  Keyboard,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Background } from '../../components/Background/index';
import { Dimensions, PixelRatio } from 'react-native';
import {
  Form,
  Input,
  SubmitButton,
  Header,
  BackButton,
  NameApp,
  DetailsMovie,
  DateMovie,
  ModalView,
  MoviePosterModal,
  List,
  MoviePoster,
  Movie,
  NameMovie,
} from './styles';

export default function Search({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [isLoadding, setIsLoadding] = useState(false);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState('');
  const [query, setQuery] = useState('');
  const [loadindSearch, setLoadinSerach] = useState(false);
  const [total, setTotal] = useState(0);

  const widthPercentageToDP = (widthPercent) => {
    const screenWidth = Dimensions.get('window').width;
    return PixelRatio.roundToNearestPixel(
      (screenWidth * parseFloat(widthPercent)) / 100
    );
  };

  //Buscar filmes na api pela a query
  const searchMovies = async () => {
    if (isLoadding) {
      return;
    }
    if (total > 0 && movies.length === total) {
      return;
    }
    setIsLoadding(true);
    setLoadinSerach(true);
    const response = await request(`search/movie`, `query=` + query, ``, page);
    setMovies([...movies, ...response.results]);
    setPage(page + 1);
    setTotal(response.total_results);
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
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={
              'O nome deste filme é: ' +
              item.original_title +
              ' e se deseja ver os detalhes do filme, aperte na imagem do filme.'
            }
          >
            <MoviePoster
              source={{
                uri: 'https://image.tmdb.org/t/p/original' + item.poster_path,
              }}
            />
          </TouchableOpacity>
        </TouchableHighlight>
      </Movie>
    );
  };

  return (
    <Background accessible={true}>
      <Header>
        <TouchableWithoutFeedback
          hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
        >
          <BackButton onPress={() => navigation.pop()}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Aperte o botão para voltar para a tela anterior."
            >
              <Icon
                name="keyboard-arrow-left"
                size={widthPercentageToDP('10%')}
                color="#FFF"
              />
            </TouchableOpacity>
          </BackButton>
        </TouchableWithoutFeedback>

        <TouchableOpacity accessible={true} accessibilityLabel="Sertão Filmes">
          <NameApp>Sertão Filmes</NameApp>
        </TouchableOpacity>
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
            <Icon
              name="search"
              size={widthPercentageToDP('6%')}
              color="#8b0000"
            />
          )}
        </SubmitButton>
      </Form>
      <List
        numColumns={3}
        data={movies}
        keyExtractor={(item) => item.id}
        onEndReached={searchMovies}
        onEndReachedThreshold={0.2}
        renderItem={movieList}
        onRefresh={() => searchMovies()}
        refreshing={isLoadding}
      />

      <Modal
        visible={modalOpen}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalOpen(false)}
      >
        <ScrollView>
          <ModalView>
            <Header>
              <TouchableWithoutFeedback
                hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
              >
                <BackButton>
                  <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Aperte o botão para voltar para a tela anterior."
                  >
                    <Icon
                      name="keyboard-arrow-left"
                      size={widthPercentageToDP('10%')}
                      color="#FFF"
                      onPress={() => setModalOpen(false)}
                    />
                  </TouchableOpacity>
                </BackButton>
              </TouchableWithoutFeedback>

              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Sertão Filmes"
              >
                <NameApp>Sertão Filmes</NameApp>
              </TouchableOpacity>
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
