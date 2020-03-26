import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import request from '../../services/api';
import { Modal } from 'react-native';
import { View } from 'react-native';
import { Background } from '../../components/Background/index';
import { Header, NameApp, NameMovie, BackButton } from './styles';

export default function MovieGenre({ navigation }) {
  //const id = navigation.state.params.id;
  useEffect(() => {}, []);

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
    </Background>
  );
}
