import React, { useState, useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import request from '../../services/api';
import PropTypes from 'prop-types';
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
  const openMenu = useRef(null);

  const widthPercentageToDP = (widthPercent) => {
    const screenWidth = Dimensions.get('window').width;
    return PixelRatio.roundToNearestPixel(
      (screenWidth * parseFloat(widthPercent)) / 100
    );
  };

  const searchGenres = async () => {
    const response = await request(`genre/movie/list`, ``, ``, page);
    setGenres(response);
  };

  const searchRecentMovies = async () => {
    if (isLoadding) {
      return;
    }
    if (total > 0 && moviesRecent.length === total) {
      return;
    }
    if (pageRedux >= page) {
      setPage(page++);
      return;
    }
    setIsLoadding(true);
    var date = new Date().getDate();
    var year = new Date().getFullYear();
    const response = await request(
      `discover/movie`,
      ``,
      `&primary_release_year=${year}&primary_release_date.gte=${date}&include_adult=false&include_video=false`,
      page
    );

    dispatch(
      addMoviesRecent(moviesRecent, response.results),
      incrementPage(page)
    );
    setPage(page + 1);
    setTotal(response.total_results);
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
          <TouchableWithoutFeedback
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
          >
            <MenuButton onPrees={() => renderDrawer()}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Abrir menu"
              >
                <Icon name="menu" size={30} color="#FFF" />
              </TouchableOpacity>
            </MenuButton>
          </TouchableWithoutFeedback>
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
