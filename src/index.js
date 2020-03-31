import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import './config/ReactotronConfig';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#8b0000" />
        <Routes />
      </NavigationContainer>
    </Provider>
  );
}
