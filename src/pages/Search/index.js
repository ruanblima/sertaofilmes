import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  Header,
  BackButton,
  NameApp,
} from './styles';

export default function Search({ navigation }) {
  return (
    <Container>
      <Header>
        <BackButton>
          <Icon
            name="keyboard-arrow-left"
            size={40}
            color="#8b0000"
            onPress={() => navigation.pop()}
          />
        </BackButton>
        <NameApp>Sertão Filmes</NameApp>
      </Header>

      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Pesquisar Filmes"
          //value={newUser}
          //onChangeText={text => this.setState({ newUser: text })}
          returnKeyType="send"
          //onSubmitEditing={this.handlerAddUser}
        />

        <SubmitButton>
          <Icon name="search" size={20} color="#8b0000" />
        </SubmitButton>
      </Form>
    </Container>
  );
}

Search.navigationOptions = {
  title: 'Sertão Filmes',
};
