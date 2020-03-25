import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 3px;
  background: #8b0000;
`;

export const Header = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border: 1px solid #8b0000;
  height: 50px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

export const NameApp = styled.Text`
  font-size: 20px;
  color: #eee;
  font-weight: bold;
`;

export const SearchButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #eee;
  border-radius: 4px;
  height: 40px;
  padding: 0 12px;
  position: absolute;
  right: 10px;
`;

export const MenuButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #eee;
  border-radius: 4px;
  height: 40px;
  padding: 0 12px;
  position: absolute;
  left: 10px;
`;

export const BackButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #eee;
  border-radius: 4px;
  height: 35px;
  position: absolute;
  left: 0;
`;

export const ModalView = styled.View`
  flex: 1;
  padding: 8px;
  background: #8b0000;
`;

export const Menu = styled.View`
  padding: 30px;
  height: 1px;
  width: 100%;
  background: #8b0000;
  border: 1px solid #8b0000;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})`
  margin-top: 10px;
`;

export const MoviePoster = styled.Image`
  width: 110px;
  height: 160px;
  background: #eee;
  border-radius: 4px;
`;

export const Movie = styled.View`
  align-items: center;
  margin: 0 4px 8px;
`;

export const NameMovie = styled.Text`
  font-size: 20px;
  color: #eee;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const DateMovie = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 13px;
  color: #eee;
  font-weight: bold;
  text-align: center;
`;

export const MoviePosterModal = styled.Image`
  width: 100%;
  margin-top: 5px;
  height: 370px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const Loadding = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#fff',
})`
  margin-top: 10;
`;

export const DetailsMovie = styled.Text`
  font-size: 12px;
  color: #eee;
  font-weight: bold;
  margin-top: 2px;
`;
