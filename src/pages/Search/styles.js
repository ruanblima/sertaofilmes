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

export const BackButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #eee;
  border-radius: 4px;
  height: 35px;
  position: absolute;
  left: 0;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #8b0000;
  margin-top: 10px;
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
