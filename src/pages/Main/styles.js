import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Dimensions, PixelRatio } from 'react-native';

//Pegando a largura do dispositivo
const widthPercentageToDP = (widthPercent) => {
  const screenWidth = Dimensions.get('window').width;
  return PixelRatio.roundToNearestPixel(
    (screenWidth * parseFloat(widthPercent)) / 100
  );
};

//Pegando a altura do dispositivo
const heightPercentageToDP = (heightPercent) => {
  const screenHeight = Dimensions.get('window').height;
  return PixelRatio.roundToNearestPixel(
    (screenHeight * parseFloat(heightPercent)) / 100
  );
};

export const Header = styled.View`
  flex-direction: row;
  border: 0 solid #8b0000;
  height: ${heightPercentageToDP('5%')}px;
  justify-content: center;
  align-items: center;
`;

export const NameApp = styled.Text`
  font-size: ${widthPercentageToDP('6%')}px;
  color: #eee;
  font-weight: bold;
  left: ${widthPercentageToDP('10%')}px;
  margin: 0 ${widthPercentageToDP('21%')}px 0px;
`;

export const SearchButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  height: ${heightPercentageToDP('5%')}px;
  padding: 0 ${widthPercentageToDP('7%')}px;
`;

export const MenuButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  height: ${heightPercentageToDP('5%')}px;
  padding: 0 ${widthPercentageToDP('7%')}px;
`;

export const BackButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  height: ${heightPercentageToDP('5%')}px;
  align-self: flex-start;
`;

export const ModalView = styled.View`
  flex: 1;
  padding: ${widthPercentageToDP('2%')}px;
  background: #8b0000;
  align-items: center;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})`
  margin-top: ${heightPercentageToDP('3%')}px;
`;

export const MoviePoster = styled.Image`
  width: ${widthPercentageToDP('30%')}px;
  height: ${heightPercentageToDP('25%')}px;
  background: #eee;
  border-radius: ${widthPercentageToDP('3%')}px;
`;

export const Movie = styled.View`
  align-items: center;
  margin: 0 ${widthPercentageToDP('1.5%')}px ${heightPercentageToDP('1.5%')}px;
`;

export const NameMovie = styled.Text`
  font-size: ${widthPercentageToDP('5%')}px;
  color: #eee;
  font-weight: bold;
  margin-top: ${heightPercentageToDP('1%')}px;
  text-align: center;
  left: ${widthPercentageToDP('1%')}px;
`;

export const DateMovie = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: ${widthPercentageToDP('4%')}px;
  color: #eee;
  font-weight: bold;
  text-align: center;
`;

export const MoviePosterModal = styled.Image`
  width: ${widthPercentageToDP('95%')}px;
  margin-top: ${heightPercentageToDP('1.5%')}px;
  height: ${heightPercentageToDP('60%')}px;
  justify-content: center;
  align-items: center;
  border-radius: ${widthPercentageToDP('3%')}px;
`;

export const Loadding = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#fff',
})`
  margin-top: ${heightPercentageToDP('5%')}px;
`;

export const DetailsMovie = styled.Text`
  font-size: ${widthPercentageToDP('4%')}px;
  color: #eee;
  font-weight: bold;
  margin-top: ${heightPercentageToDP('0.7%')}px;
  position: relative;
  left: ${widthPercentageToDP('1%')}px;
  align-self: flex-start;
`;

export const NameGenre = styled.Text`
  font-size: ${widthPercentageToDP('6%')}px;
  color: #fff;
  font-weight: bold;
  margin-top: ${heightPercentageToDP('0.1%')}px;
  text-align: center;
`;

export const ButtonGenre = styled.View`
  flex-direction: row;
  border: 0 solid #8b0000;
  height: ${heightPercentageToDP('9%')}px;
  justify-content: center;
  align-items: center;
`;
export const ButtonGenreIcon = styled.View`
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  height: ${heightPercentageToDP('9.5%')}px;
  position: absolute;
  left: ${heightPercentageToDP('3%')}px;
`;

export const HeaderMenu = styled.View`
  flex-direction: row;
  border: 0 solid #8b0000;
  background: #8b0000;
  height: ${heightPercentageToDP('6.5%')}px;
  justify-content: center;
  align-items: center;
`;

export const NameSearch = styled.Text`
  font-size: ${widthPercentageToDP('6%')}px;
  color: #fff;
  font-weight: bold;
  margin-top: ${heightPercentageToDP('2%')}px;
  text-align: center;
`;
