import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
const Stack = createStackNavigator();
import Main from './pages/Main';
import Search from './pages/Search';

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#8b0000' },
        headerTintColor: '#FFF',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ title: 'Sertão Filmes' }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ title: 'Sertão Filmes' }}
      />
    </Stack.Navigator>
  );
}
