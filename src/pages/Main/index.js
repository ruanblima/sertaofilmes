import React, { useState, useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import request from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMoviesRecent,
  incrementPage,
} from '../../store/modules/moviesRecent/actions';
import {
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import { Background } from '../../components/Background/index';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { Dimensions, PixelRatio } from 'react-native';
import {
  SearchButton,
  List,
  MoviePoster,
  Movie,
  NameMovie,
  MenuButton,
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
  const moviesRecent = useSelector((state) => state.moviesRecent.results);
  const pageRedux = useSelector((state) => state.moviesRecent.page);
  const [total, setTotal] = useState(0);
  const [isLoadding, setIsLoadding] = useState(false);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState('');
  const [genres, setGenres] = useState('');
  const dispatch = useDispatch();

  //Pegando a largura do celular
  const widthPercentageToDP = (widthPercent) => {
    const screenWidth = Dimensions.get('window').width;
    return PixelRatio.roundToNearestPixel(
      (screenWidth * parseFloat(widthPercent)) / 100
    );
  };

  //Buscando todos os gênerso da API
  const searchGenres = async () => {
    const response = await request(`genre/movie/list`, ``, ``, page);
    setGenres(response);
  };

  const searchRecentMovies = async () => {
    if (isLoadding) {
      return;
    }
    //Verificação, para saber se foram buscados todos os filmes, caso tenha buscado, ele não faz mais a requisição.
    if (total > 0 && moviesRecent.length === total) {
      return;
    }
    //Se a página buscada já estiver no redux, ele não faz a busca a api, e incrementa a page para que possa, sempre fazer essa verificação.
    if (pageRedux >= page) {
      setPage(page++);
      return;
    }
    setIsLoadding(true);
    //pegar a data atual
    var date = new Date().getDate();
    //pegar o ano atual
    var year = new Date().getFullYear();
    //Buscar filmes recentes;
    const response = await request(
      `discover/movie`,
      ``,
      `&primary_release_year=${year}&primary_release_date.gte=${date}&include_adult=false&include_video=false`,
      page
    );

    //Chamando as ações do redux, para armazenar os filmes, e até qual page foi buscada;
    dispatch(
      addMoviesRecent(moviesRecent, response.results),
      incrementPage(page)
    );
    setPage(page + 1);
    //Inserindo a quantidade total de filmes
    setTotal(response.total_results);
    setIsLoadding(false);
  };

  //Listando todos os gêneros
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
            <Icon
              name="local-movies"
              size={widthPercentageToDP('7.5%')}
              color="#FFF"
            />
          </ButtonGenreIcon>
          <NameGenre>{item.name}</NameGenre>
        </ButtonGenre>
      </TouchableHighlight>
    );
  };

  //Renderizando o menu
  const renderDrawer = () => {
    return (
      <>
        <HeaderMenu>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Buscar filmes por gênero"
          >
            <NameSearch>Buscar filmes por gênero</NameSearch>
          </TouchableOpacity>
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

  //Lista de filmes recentes
  const movieListRecent = ({ item }) => {
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

  useEffect(() => {
    searchRecentMovies();
    searchGenres();
  }, []);

  return (
    <DrawerLayout
      drawerWidth={widthPercentageToDP('70%')}
      drawerPosition={DrawerLayout.positions.Left}
      drawerType="front"
      drawerBackgroundColor="#8b0000"
      renderNavigationView={renderDrawer}
    >
      <Background accessible={true}>
        <Header>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Sertão Filmes"
          >
            <NameApp>Sertão Filmes</NameApp>
          </TouchableOpacity>

          <TouchableWithoutFeedback
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
          >
            <SearchButton onPress={() => navigation.push('Search')}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Aperte o botão para ir para a página de pesquisar filmes por nome."
              >
                <Icon name="search" size={30} color="#FFF" />
              </TouchableOpacity>
            </SearchButton>
          </TouchableWithoutFeedback>
        </Header>
        <List
          numColumns={3}
          data={moviesRecent}
          keyExtractor={(item) => item.id}
          onEndReached={searchRecentMovies}
          onEndReachedThreshold={0.1}
          renderItem={movieListRecent}
          onRefresh={() => searchRecentMovies()}
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
