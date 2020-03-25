import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 3px;
  background: #8b0000;
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

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #8b0000;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;

  padding 0 15px;
  border: 1px solid #eee;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #eee;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
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

export const NameApp = styled.Text`
  font-size: 20px;
  color: #eee;
  font-weight: bold;
  margin-top: 4px;
  margin-left: 70px;
  text-align: center;
`;
export const MoviePosterModal = styled.Image`
  width: 100%;
  height: 280px;
  background: #eee;
`;

export const Loadding = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#fff',
})`
  margin-top: 10;
`;

export const HeaderModal = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: #8b0000;
`;

export const Overview = styled.Text`
  font-size: 12px;
  color: #eee;
  font-weight: bold;
  margin-top: 4px;
`;
