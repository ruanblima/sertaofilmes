import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
const Stack = createStackNavigator();
import Main from './pages/Main';
import Search from './pages/Search';
import MovieGenre from './pages/MovieGenre';

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#8b0000' },
        headerTintColor: '#FFF',
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={Main} options={{ title: 'Main' }} />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ title: 'Search' }}
      />

      <Stack.Screen
        name="MovieGenre"
        component={MovieGenre}
        options={{ title: 'MovieGenre' }}
      />
    </Stack.Navigator>
  );
}
